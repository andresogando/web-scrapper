import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../app.module";

describe("Find Jobs", () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });

  test("/ (GET): FindAll limit to 1 result", async () => {
    const res = await request(app.getHttpServer()).get("/jobs?limit=1");
    expect(JSON.parse(res.text).data).toHaveLength(1);
    expect(res.statusCode).toBe(200);
  });

  test("/ (GET): FindAll", async () => {
    const res = await request(app.getHttpServer()).get("/jobs");
    expect(res.statusCode).toBe(200);
  });

  test("/ (GET): FindByTechnology", async () => {
    const res = await request(app.getHttpServer()).get(
      "/jobs/search/ByTechnology?technology=Javascript&limit=20"
    );
    expect(JSON.parse(res.text).data[0].description).toContain("Javascript");
    expect(res.statusCode).toBe(200);

    // expect(JSON.parse(res.text).data).toHaveLength(1);
    // testing purposes, but will fail because data is never the same unless we search by Id.
    // expect(JSON.parse(res.text).data[0]).toMatchObject<JobType>({...testJob});
  });

  test("/ (GET): FindByLocation", async () => {
    const res = await request(app.getHttpServer()).get(
      "/jobs/search/ByLocation?limit=20&location=Toronto"
    );
    expect(JSON.parse(res.text).data[0].address).toContain("Toronto");
    expect(res.statusCode).toBe(200);
  });

  test("/ (GET): FindByLocation & sort ", async () => {
    const res = await request(app.getHttpServer()).get(
      "/jobs/search/ByLocation?limit=20&sort=address&location=Toronto"
    );
    expect(JSON.parse(res.text).data[0].address).toContain("Toronto");
    expect(res.statusCode).toBe(200);
  });

  test("/ (GET): FindByTechnology & sort ", async () => {
    const res = await request(app.getHttpServer()).get(
      "/jobs/search/ByTechnology?limit=20&sort=technology&technology=Typescript"
    );
    expect(JSON.parse(res.text).data[0].description).toContain("Typescript");
    expect(res.statusCode).toBe(200);
  });

  it("/ (GET) RESPONSE 404", () => {
    return request(app.getHttpServer()).get("/hola").expect(404);
  });


});
