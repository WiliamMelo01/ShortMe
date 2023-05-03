import { Test, TestingModule } from '@nestjs/testing';
import { spec } from 'pactum';
import { PrismaService } from '../prisma.service';

describe('Uris shorting tests', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prismaService.uRI.deleteMany({
      where: {
        NOT: {
          hash: 'd9b72b4b-628d-4fda-9502-5a9b29d49e0c',
        },
      },
    });
  });

  afterEach(async () => {
    await prismaService.uRI.deleteMany({
      where: {
        NOT: {
          hash: 'd9b72b4b-628d-4fda-9502-5a9b29d49e0c',
        },
      },
    });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should return 200 status code when get all uris', async () => {
    await spec().get('http://localhost:3000/uri/all').expectStatus(200);
  });

  it('should return 201 when shorted an uri', async () => {
    await spec()
      .post('http://localhost:3000/uri/create')
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
      .get('http://localhost:3000/uri/d9b72b4b-628d-4fda-9502-5a9b29d49e0c')
      .expectStatus(302);
  });

  it('should not redirect user and return a 400 status code if a invalid shorted url is provided', async () => {
    await spec().get('http://localhost:3000/uri/adadad').expectStatus(404);
  });
});
