import { Test, TestingModule } from '@nestjs/testing';
import { UriService } from './uri.service';
import { PrismaService } from '../prisma.service';

describe('UriService', () => {
  let uriService: UriService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UriService, PrismaService],
    }).compile();

    uriService = module.get<UriService>(UriService);
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

  describe('createNewShortUri', () => {
    it('should be defined', () => {
      expect(uriService).toBeDefined();
    });

    it('should create a new short uri', async () => {
      const uri = 'https://www.google.com';
      const createNewShortUriDto = { linkToRedirect: uri };
      const result = await uriService.createNewShortUri(createNewShortUriDto);

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          linkToRedirect: uri,
          hash: expect.any(String),
          shortnedLink: expect.stringContaining('http://localhost:3000/uri/'),
        }),
      );
    });
  });

  it('should return uri data when a valid hash is provided', async () => {
    const uri = 'https://www.google.com';
    const createdShortUri = await uriService.createNewShortUri({
      linkToRedirect: uri,
    });

    const result = await uriService.findUriByHash(createdShortUri.hash);

    expect(result).toBeDefined();
    expect(result).toEqual(
      expect.objectContaining({
        hash: createdShortUri.hash,
        linkToRedirect: uri,
        id: expect.any(String),
        shortnedLink: `http://localhost:3000/uri/${createdShortUri.hash}`,
      }),
    );
  });

  it('should not return uri data when a invalid hash is provided', async () => {
    const result = await uriService.findUriByHash('abcd1234');

    expect(result).toBeNull();
  });

  it('should return an array of Uris data', async () => {
    const uri = 'https://www.google.com';
    await uriService.createNewShortUri({
      linkToRedirect: uri,
    });

    const result = await uriService.getAllShortUris();

    expect(result.length).toBeGreaterThan(0);
    expect(Array.isArray(result)).toBeTruthy();
  });
});
