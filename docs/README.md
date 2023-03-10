@vanih/dunes-node

# @vanih/dunes-node

## Table of contents

### Type Aliases

- [CompressionOptions](README.md#compressionoptions)
- [FfmpegData](README.md#ffmpegdata)
- [RunFfmpegOptions](README.md#runffmpegoptions)
- [ThumbnailOptions](README.md#thumbnailoptions)
- [VideoStats](README.md#videostats)

### Functions

- [analyzeVideo](README.md#analyzevideo)
- [compressVideo](README.md#compressvideo)
- [createThumbnail](README.md#createthumbnail)

## Type Aliases

### CompressionOptions

Ƭ **CompressionOptions**: { `bitrateKbs?`: `number` ; `crf?`: `IntRange`<``0``, ``64``\> ; `height?`: `number` ; `maxBitrateKbs?`: `number` ; `minBitrateKbs?`: `number` ; `width?`: `number`  } & [`RunFfmpegOptions`](README.md#runffmpegoptions)

#### Defined in

[types.ts:19](https://github.com/Angael/dunes-node/blob/a7777f5/src/types.ts#L19)

___

### FfmpegData

Ƭ **FfmpegData**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitrate` | `number` |
| `fps` | `number` |
| `frame` | `number` |
| `q` | `number` |
| `rawString` | `string` |
| `size` | `number` |
| `speed` | `number` |
| `time` | `number` |

#### Defined in

[types.ts:42](https://github.com/Angael/dunes-node/blob/a7777f5/src/types.ts#L42)

___

### RunFfmpegOptions

Ƭ **RunFfmpegOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onProgress?` | (`data`: [`FfmpegData`](README.md#ffmpegdata)) => `void` |
| `onStart?` | (`command`: `string`) => `void` |
| `shouldOverwrite?` | `boolean` |

#### Defined in

[types.ts:36](https://github.com/Angael/dunes-node/blob/a7777f5/src/types.ts#L36)

___

### ThumbnailOptions

Ƭ **ThumbnailOptions**: { `height`: `number` ; `time?`: `number` ; `width`: `number`  } & [`RunFfmpegOptions`](README.md#runffmpegoptions)

#### Defined in

[types.ts:13](https://github.com/Angael/dunes-node/blob/a7777f5/src/types.ts#L13)

___

### VideoStats

Ƭ **VideoStats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitrateKb` | `number` |
| `durationMs` | `number` |
| `height` | `number` |
| `sizeBytes` | `number` |
| `width` | `number` |

#### Defined in

[types.ts:28](https://github.com/Angael/dunes-node/blob/a7777f5/src/types.ts#L28)

## Functions

### analyzeVideo

▸ **analyzeVideo**(`path`): `Promise`<[`VideoStats`](README.md#videostats)\>

**`Example`**

```ts
import { analyzeVideo } from '@vanih/dunes-node';

const result = await analyzeVideo('./video.mp4');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to video |

#### Returns

`Promise`<[`VideoStats`](README.md#videostats)\>

Promise with video stats of video from supplied path.

#### Defined in

[functions/analyzeVideo.ts:34](https://github.com/Angael/dunes-node/blob/a7777f5/src/functions/analyzeVideo.ts#L34)

___

### compressVideo

▸ **compressVideo**(`srcPath`, `outPath`, `options`): `Promise`<`void`\>

**`Example`**

Create compressed copy of video, with the worst possible quality and best size. Resolution is kept original
```ts
import { compressVideo } from '@vanih/dunes-node';

const src = './video_in.mp4';
const out = './video_out.webm';
await compressVideo(src, out, {
    crf: 63,
});
```

**`Throws`**

When ffmpeg encounters an error

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `srcPath` | `string` | Path to existing original video |
| `outPath` | `string` | Path where compressed video should be saved. Currently only supports webm files. |
| `options` | [`CompressionOptions`](README.md#compressionoptions) | Compression options to use when compressing the video |

#### Returns

`Promise`<`void`\>

Promise that resolves when compression ends.

#### Defined in

[functions/compressVideo.ts:24](https://github.com/Angael/dunes-node/blob/a7777f5/src/functions/compressVideo.ts#L24)

___

### createThumbnail

▸ **createThumbnail**(`srcPath`, `outPath`, `options`): `Promise`<`void`\>

**`Throws`**

When ffmpeg encounters error

**`Example`**

Create thumbnail with resolution 32x32
```ts
import { createThumbnail } from '@vanih/dunes-node';

const src = './video_in.mp4';
const out = './video_out.webp';
await createThumbnail(src, out, {
  width: 32,
  height: 32,
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `srcPath` | `string` | Path to existing original video |
| `outPath` | `string` | Path to webp thumbnail that you want to create |
| `options` | [`ThumbnailOptions`](README.md#thumbnailoptions) | Options for creating thumbnail |

#### Returns

`Promise`<`void`\>

Promise that resolves when thumbnail is created

#### Defined in

[functions/createThumbnail.ts:27](https://github.com/Angael/dunes-node/blob/a7777f5/src/functions/createThumbnail.ts#L27)
