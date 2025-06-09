# testing

when I create unit tests for this api
I want to use mocha and the chai assertion library to generate them

I want them to be structured with
arrange / act / assert style

I do not want to use the 'expect' format for validation, I want to use assert from chai

For testing fetching from an api, reading from a cache, etc ensure to stub those calls
use the sinon libaries to mock and stub dependencies
