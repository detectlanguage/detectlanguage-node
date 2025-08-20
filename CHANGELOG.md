# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## v3.0.0

### Added
- `detectBatch()` for batch detections

### Changed
- Switched to v3 API which uses updated language detection model
- ⚠️ `detect()` result fields are `language` and `score`
- Switched to the native `fetch` API. Minimum supported Node version 8.

### Deprecated
- Calling `detect()` with array argument. Use `detectBatch` instead.
- `userStatus()` - Use `accountStatus()` instead.

### Removed
- `axios` dependency
