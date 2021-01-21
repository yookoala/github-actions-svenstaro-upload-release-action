jest.mock('@actions/core');
jest.mock('@actions/github');
jest.mock('fs');

import run from '../src/functions'

// Frankly, tests would be entirely useless unless we can mock GitHub somehow.
describe('Upload Release Action', () => {
  let spyGetOctokit: jest.SpyInstance<any>
  let mockOctokit: any

  beforeEach(() => {
    mockOctokit = {
      repos: {
        createRelease: jest.fn(async () => ({
          data: {
            id: 'lalala',
            upload_url: 'oaoa'
          }
        }))
      }
    }
    // spyGetOctokit = jest.spyOn(github, "getOctokit").mockImplementation(() => mockOctokit
    // jest.spyOn(github, "context", "get").mockImplementation(() => "testtest");
  })

  it('pls write actual test', async () => {
    core.getInput = jest
      .fn()
      // repo_token
      .mockReturnValueOnce('repo_token')
      // file
      .mockReturnValueOnce('file')
      // tag
      .mockReturnValueOnce('tag')
      // file_glob
      .mockReturnValueOnce('false')
      // overwrite
      .mockReturnValueOnce('false')
      // prerelese
      .mockReturnValueOnce('false')
      // release_name
      .mockReturnValueOnce('release_name')
      // body
      .mockReturnValueOnce('body')
      // asset_name
      .mockReturnValueOnce('asset_name')
      // asset_name (again)
      .mockReturnValueOnce('asset_name')

    await run();

  })
})
