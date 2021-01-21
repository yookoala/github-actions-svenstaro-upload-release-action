jest.mock('@actions/core');
jest.mock('@actions/github');
jest.mock('fs');

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github');
const fs = require('fs');

import run from '../src/functions'


// Frankly, tests would be entirely useless unless we can mock GitHub somehow.
describe('Upload Release Action', () => {
  let uploadReleaseAsset: any
  let spyGetOctokit: jest.SpyInstance<any>
  let mockOctokit: any

  beforeEach(() => {
    uploadReleaseAsset = jest.fn().mockReturnValueOnce({
      data: {
        browser_download_url: 'browserDownloadUrl'
      }
    })

    fs.statSync = jest.fn().mockReturnValueOnce({
      size: 527
    })

    content = Buffer.from('test content')
    fs.readFileSync = jest.fn().mockReturnValueOnce(content)

    context.repo = {
      owner: 'owner',
      repo: 'repo'
    }

    const github = {
      repos: {
        uploadReleaseAsset
      }
    }

    GitHub.mockImplementation(() => github);

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

  it('Upload release asset with only the required inputs', async () => {
    core.getInput = jest
      .fn()
      // repo_token (required)
      .mockReturnValueOnce('repo_token')
      // file (required)
      .mockReturnValueOnce('filename')
      // tag (required)
      .mockReturnValueOnce('tag')
      // file_glob
      .mockReturnValueOnce('')
      // overwrite
      .mockReturnValueOnce('')
      // prerelese
      .mockReturnValueOnce('')
      // release_name
      .mockReturnValueOnce('')
      // body
      .mockReturnValueOnce('')
      // asset_name
      .mockReturnValueOnce('')
      // asset_name (again)
      .mockReturnValueOnce('')

    await run();

    expect(uploadReleaseAsset).toHaveBeenCalledWith({
      url: 'upload_url',
      headers: { 'content-type': 'binary/octet-stream', 'content-length': 527 },
      name: 'filename',
      file: content
    });

  })
})
