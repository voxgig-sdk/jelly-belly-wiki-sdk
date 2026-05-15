-- JellyBellyWiki SDK error

local JellyBellyWikiError = {}
JellyBellyWikiError.__index = JellyBellyWikiError


function JellyBellyWikiError.new(code, msg, ctx)
  local self = setmetatable({}, JellyBellyWikiError)
  self.is_sdk_error = true
  self.sdk = "JellyBellyWiki"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function JellyBellyWikiError:error()
  return self.msg
end


function JellyBellyWikiError:__tostring()
  return self.msg
end


return JellyBellyWikiError
