import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { PrismaService } from '../prisma.service';

describe('UrlService', () => {
  let urlService: UrlService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService, PrismaService],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prismaService.url.deleteMany({
      where: {
        NOT: {
          hash: 'a2e4',
        },
      },
    });
  });

  afterEach(async () => {
    await prismaService.url.deleteMany({
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

  describe('createNewShortUrl', () => {
    it('should be defined', () => {
      expect(urlService).toBeDefined();
    });

    it('should create a new short url', async () => {
      const url = 'https://www.google.com';
      const createNewShortUrlDto = { linkToRedirect: url };
      const result = await urlService.createNewShortUrl(createNewShortUrlDto);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          linkToRedirect: url,
          hash: expect.any(String),
          shortnedLink: expect.stringContaining('http://localhost:3000/url/'),
        }),
      );
    });
  });

  it('should return url data when a valid hash is provided', async () => {
    const url = 'https://www.google.com';
    const createdShortUrl = await urlService.createNewShortUrl({
      linkToRedirect: url,
    });

    const result = await urlService.findUrlByHash(createdShortUrl.hash);

    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.objectContaining({
        hash: createdShortUrl.hash,
        linkToRedirect: url,
        id: expect.any(String),
        shortnedLink: `http://localhost:3000/url/${createdShortUrl.hash}`,
      }),
    );
  });

  it('should not return url data when a invalid hash is provided', async () => {
    const result = await urlService.findUrlByHash('abcd1234');

    expect(result).toBeNull();
  });

  it('should return an array of Url data', async () => {
    const url = 'https://www.google.com';
    await urlService.createNewShortUrl({
      linkToRedirect: url,
    });

    const result = await urlService.getAllShortUrls();

    expect(result.length).toBeGreaterThan(0);
    expect(Array.isArray(result)).toBeTruthy();
  });
});
