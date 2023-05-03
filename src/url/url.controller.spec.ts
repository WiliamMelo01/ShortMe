import { Test, TestingModule } from '@nestjs/testing';
import { spec } from 'pactum';
import { PrismaService } from '../prisma.service';

describe("Url's shorting tests", () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prismaService.uRL.deleteMany({
      where: {
        NOT: {
          hash: 'a2e4',
        },
      },
    });
  });

  afterEach(async () => {
    await prismaService.uRL.deleteMany({
      where: {
        NOT: {
          hash: 'a2e4',
        },
      },
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it("should return 200 status code when get all url's", async () => {
    await spec().get('http://localhost:3000/url/all').expectStatus(200);
  });

  it('should return 201 when shorted an url', async () => {
    await spec()
      .post('http://localhost:3000/url/create')
      .withJson({
        linkToRedirect: 'https://www.google.com',
      })
      .expectStatus(201)
      .expectJsonLike({
        linkToRedirect: 'https://www.google.com',
      });
  });

  it('should redirect user and return a 302 status code if a valid shorted url is provided', async () => {
    await spec()
      .get('http://localhost:3000/url/d9b72b4b-628d-4fda-9502-5a9b29d49e0c')
      .expectStatus(302);
  });

  it('should not redirect user and return a 400 status code if a invalid shorted url is provided', async () => {
    await spec().get('http://localhost:3000/url/adadad').expectStatus(404);
  });
});
