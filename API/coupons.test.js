const assert = require("node:assert/strict");
const { after, describe, it } = require("node:test");
const request = require("supertest");
require("./load-env");

const baseUrl =
  process.env.EBAC_API_BASE_URL || "http://lojaebac.ebaconline.art.br/wp-json";
const couponsEndpoint = "/wc/v3/coupons";
const authorization = process.env.EBAC_API_AUTHORIZATION;
const apiUsername = process.env.EBAC_API_USERNAME;
const apiPassword = process.env.EBAC_API_PASSWORD;
const hasBasicCredentials = Boolean(apiUsername && apiPassword);
const hasAuthorization = Boolean(authorization || hasBasicCredentials);
const couponCode = `ganhe10-e2e-${Date.now()}`;
const couponPayload = {
  code: couponCode,
  amount: "10.00",
  discount_type: "fixed_product",
  description: "Cupom criado pelos testes automatizados da US003",
};

let createdCouponId;

function authorized(requestBuilder) {
  if (hasBasicCredentials) {
    return requestBuilder.auth(apiUsername, apiPassword);
  }

  if (!authorization) throw new Error("Configure as credenciais Basic da API.");
  return requestBuilder.set("Authorization", authorization);
}

function assertStatus(response, expectedStatus) {
  const details =
    typeof response.body === "object"
      ? JSON.stringify(response.body)
      : String(response.text || "").slice(0, 300);

  assert.equal(
    response.status,
    expectedStatus,
    `Resposta inesperada de ${response.request.method} ${response.request.url}: ${details}`
  );
}

describe(
  "US003 - API de Cupons",
  {
    skip:
      !hasAuthorization &&
      "Configure EBAC_API_USERNAME/EBAC_API_PASSWORD ou EBAC_API_AUTHORIZATION para habilitar os testes.",
  },
  () => {
    it("lista os cupons cadastrados", async () => {
      const response = await authorized(
        request(baseUrl).get(couponsEndpoint).query({ per_page: 10 })
      );

      assertStatus(response, 200);
      assert.ok(Array.isArray(response.body), "A resposta deve ser uma lista de cupons.");

      for (const coupon of response.body) {
        assert.equal(typeof coupon.id, "number");
        assert.equal(typeof coupon.code, "string");
        assert.ok(["percent", "fixed_cart", "fixed_product"].includes(coupon.discount_type));
      }
    });

    it("cadastra um cupom com os campos obrigatórios da US003", async () => {
      const response = await authorized(
        request(baseUrl).post(couponsEndpoint).type("form").send(couponPayload)
      );

      assertStatus(response, 201);
      assert.equal(response.body.code, couponCode);
      assert.equal(Number(response.body.amount), 10);
      assert.equal(response.body.discount_type, couponPayload.discount_type);
      assert.equal(response.body.description, couponPayload.description);
      assert.equal(typeof response.body.id, "number");

      createdCouponId = response.body.id;
    });

    it("consulta um cupom pelo ID", async (t) => {
      if (!createdCouponId) {
        t.skip("O cupom precisa ser criado antes da consulta por ID.");
        return;
      }

      const response = await authorized(
        request(baseUrl).get(`${couponsEndpoint}/${createdCouponId}`)
      );

      assertStatus(response, 200);
      assert.equal(response.body.id, createdCouponId);
      assert.equal(response.body.code, couponCode);
    });

    it("rejeita o cadastro de um código de cupom duplicado", async () => {
      const response = await authorized(
        request(baseUrl).post(couponsEndpoint).type("form").send(couponPayload)
      );

      assertStatus(response, 400);
      assert.equal(typeof response.body.code, "string");
      assert.equal(typeof response.body.message, "string");
    });

    after(async () => {
      if (!createdCouponId) return;

      const response = await authorized(
        request(baseUrl)
          .delete(`${couponsEndpoint}/${createdCouponId}`)
          .query({ force: true })
      );

      assertStatus(response, 200);
    });
  }
);
