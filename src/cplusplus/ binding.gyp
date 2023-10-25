{
  "targets": [
    {
      "target_name": "atom",
      "sources": [ "src/atom.cpp" ],
      "include_dirs": ["<!(node -e \"require('node-addon-api').include\")"],
      "dependencies": ["<!(node -e \"require('node-addon-api').gyp\")"],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}
