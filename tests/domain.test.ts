import supertest from "supertest";
import createServer from "../src/utils/server";

const app = createServer();

export const domain = "amazon.com";
export const domainPayload = {
    "domains": [
      "amazon.com"
    ]
  };

describe("domain", () => {
    describe("get domain route", () => {
        describe("given the domain does not exist", () => {
          it("should return a 404", async () => {
            const testUrl = "test_test_test";
    
            await supertest(app).get(`/api/domain/:${testUrl}`).expect(404);
          });
        });
    
        describe("given the domain is not created", () => {
            it("should return a 500 status", async () => {
              const { body, statusCode } = await supertest(app).post(
                `/api/domain/create`
              ).send({});
      
              expect(statusCode).toBe(500);
            });
          });

        describe("given the domain is created", () => {
            it("should return a 201 status and success message", async () => {
              // @ts-ignore
              const { body, statusCode } = await supertest(app).post(
                `/api/domain/create`
              ).send(domainPayload);
              expect(statusCode).toBe(201);
              console.log(body);
            });
          });

        describe("given the domain does exist", () => {
            it("should return a 200 status and the domain", async () => {
                const { body, statusCode } = await supertest(app).get(
                `/api/domain/${domain}`
                );
        
                expect(statusCode).toBe(200);
            });
        });
      });
});