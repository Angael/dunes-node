@vanih/dunes-node

# @vanih/dunes-node

## Table of contents

### Type Aliases

- [CompressionOptions](README.md#compressionoptions)
- [CutOptions](README.md#cutoptions)
- [FfmpegData](README.md#ffmpegdata)
- [FfprobeOutput](README.md#ffprobeoutput)
- [Format](README.md#format)
- [RunFfmpegOptions](README.md#runffmpegoptions)
- [SimpleAnalysisStats](README.md#simpleanalysisstats)
- [Stream](README.md#stream)
- [ThumbnailOptions](README.md#thumbnailoptions)

### Functions

- [analyze](README.md#analyze)
- [compressVideo](README.md#compressvideo)
- [createThumbnail](README.md#createthumbnail)
- [cut](README.md#cut)

## Type Aliases

### CompressionOptions

Ƭ **CompressionOptions**: { `audioBitrateKbs?`: `number` ; `bitrateKbs?`: `number` ; `crf?`: `IntRange`<``0``, ``64``\> ; `height?`: `number` ; `maxBitrateKbs?`: `number` ; `minBitrateKbs?`: `number` ; `width?`: `number`  } & [`RunFfmpegOptions`](README.md#runffmpegoptions)

#### Defined in

[types.ts:21](https://github.com/Angael/dunes-node/blob/d38da99/src/types.ts#L21)

___

### CutOptions

Ƭ **CutOptions**: { `endTimeMs`: `number` ; `precise?`: `boolean` ; `startTimeMs`: `number`  } & [`RunFfmpegOptions`](README.md#runffmpegoptions)

#### Defined in

[types.ts:63](https://github.com/Angael/dunes-node/blob/d38da99/src/types.ts#L63)

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

[types.ts:52](https://github.com/Angael/dunes-node/blob/d38da99/src/types.ts#L52)

___

### FfprobeOutput

Ƭ **FfprobeOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `format` | [`Format`](README.md#format) |
| `streams` | [`Stream`](README.md#stream)[] |

#### Defined in

[functions/analyze.type.ts:79](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/analyze.type.ts#L79)

___

### Format

Ƭ **Format**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bit_rate` | `string` |
| `duration` | `string` |
| `filename` | `string` |
| `format_long_name` | `string` |
| `format_name` | `string` |
| `nb_programs` | `number` |
| `nb_streams` | `number` |
| `probe_score` | `number` |
| `size` | `string` |
| `start_time` | `string` |
| `tags` | { `compatible_brands`: `string` ; `encoder`: `string` ; `major_brand`: `string` ; `minor_version`: `string`  } |
| `tags.compatible_brands` | `string` |
| `tags.encoder` | `string` |
| `tags.major_brand` | `string` |
| `tags.minor_version` | `string` |

#### Defined in

[functions/analyze.type.ts:60](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/analyze.type.ts#L60)

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

[types.ts:46](https://github.com/Angael/dunes-node/blob/d38da99/src/types.ts#L46)

___

### SimpleAnalysisStats

Ƭ **SimpleAnalysisStats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `audio?` | { `channels`: `number` ; `sampleRate`: `number`  } |
| `audio.channels` | `number` |
| `audio.sampleRate` | `number` |
| `bitrateKb` | `number` |
| `durationMs` | `number` |
| `sizeBytes` | `number` |
| `video?` | { `fps`: `number` ; `height`: `number` ; `width`: `number`  } |
| `video.fps` | `number` |
| `video.height` | `number` |
| `video.width` | `number` |

#### Defined in

[types.ts:31](https://github.com/Angael/dunes-node/blob/d38da99/src/types.ts#L31)

___

### Stream

Ƭ **Stream**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `avg_frame_rate` | `string` |
| `bit_rate` | `string` |
| `bits_per_raw_sample?` | `string` |
| `bits_per_sample?` | `number` |
| `channel_layout?` | `string` |
| `channels?` | `number` |
| `chroma_location?` | `string` |
| `codec_long_name` | `string` |
| `codec_name` | `string` |
| `codec_tag` | `string` |
| `codec_tag_string` | `string` |
| `codec_time_base` | `string` |
| `codec_type` | `string` |
| `coded_height?` | `number` |
| `coded_width?` | `number` |
| `display_aspect_ratio?` | `string` |
| `disposition` | { `attached_pic`: `number` ; `clean_effects`: `number` ; `comment`: `number` ; `default`: `number` ; `dub`: `number` ; `forced`: `number` ; `hearing_impaired`: `number` ; `karaoke`: `number` ; `lyrics`: `number` ; `original`: `number` ; `timed_thumbnails`: `number` ; `visual_impaired`: `number`  } |
| `disposition.attached_pic` | `number` |
| `disposition.clean_effects` | `number` |
| `disposition.comment` | `number` |
| `disposition.default` | `number` |
| `disposition.dub` | `number` |
| `disposition.forced` | `number` |
| `disposition.hearing_impaired` | `number` |
| `disposition.karaoke` | `number` |
| `disposition.lyrics` | `number` |
| `disposition.original` | `number` |
| `disposition.timed_thumbnails` | `number` |
| `disposition.visual_impaired` | `number` |
| `duration` | `string` |
| `duration_ts` | `number` |
| `has_b_frames?` | `number` |
| `height?` | `number` |
| `index` | `number` |
| `is_avc?` | `string` |
| `level?` | `number` |
| `max_bit_rate?` | `string` |
| `nal_length_size?` | `string` |
| `nb_frames` | `string` |
| `pix_fmt?` | `string` |
| `profile` | `string` |
| `r_frame_rate` | `string` |
| `refs?` | `number` |
| `sample_aspect_ratio?` | `string` |
| `sample_fmt?` | `string` |
| `sample_rate?` | `string` |
| `start_pts` | `number` |
| `start_time` | `string` |
| `tags` | { `handler_name`: `string` ; `language`: `string`  } |
| `tags.handler_name` | `string` |
| `tags.language` | `string` |
| `time_base` | `string` |
| `width?` | `number` |

#### Defined in

[functions/analyze.type.ts:2](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/analyze.type.ts#L2)

___

### ThumbnailOptions

Ƭ **ThumbnailOptions**: { `height`: `number` ; `time?`: `number` ; `width`: `number`  } & [`RunFfmpegOptions`](README.md#runffmpegoptions)

#### Defined in

[types.ts:15](https://github.com/Angael/dunes-node/blob/d38da99/src/types.ts#L15)

## Functions

### analyze

▸ **analyze**(`ffprobePath`, `path`): `Promise`<[`SimpleAnalysisStats`](README.md#simpleanalysisstats)\>

Analyze audio or video file in a simple way.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ffprobePath` | `string` | - |
| `path` | `string` | Path to video or video file |

#### Returns

`Promise`<[`SimpleAnalysisStats`](README.md#simpleanalysisstats)\>

Promise with stats of audio or video file.

#### Defined in

[functions/analyze.ts:10](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/analyze.ts#L10)

___

### compressVideo

▸ **compressVideo**(`ffprobePath`, `srcPath`, `outPath`, `options`): `Promise`<`void`\>

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
| `ffprobePath` | `string` | - |
| `srcPath` | `string` | Path to existing original video |
| `outPath` | `string` | Path where compressed video should be saved. Currently only supports webm files. |
| `options` | [`CompressionOptions`](README.md#compressionoptions) | Compression options to use when compressing the video |

#### Returns

`Promise`<`void`\>

Promise that resolves when compression ends.

#### Defined in

[functions/compressVideo.ts:24](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/compressVideo.ts#L24)

___

### createThumbnail

▸ **createThumbnail**(`ffmpegPath`, `srcPath`, `outPath`, `options`): `Promise`<`void`\>

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
| `ffmpegPath` | `string` | - |
| `srcPath` | `string` | Path to existing original video |
| `outPath` | `string` | Path to webp thumbnail that you want to create |
| `options` | [`ThumbnailOptions`](README.md#thumbnailoptions) | Options for creating thumbnail |

#### Returns

`Promise`<`void`\>

Promise that resolves when thumbnail is created

#### Defined in

[functions/createThumbnail.ts:27](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/createThumbnail.ts#L27)

___

### cut

▸ **cut**(`ffmpegPath`, `srcPath`, `outPath`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ffmpegPath` | `string` |
| `srcPath` | `string` |
| `outPath` | `string` |
| `options` | [`CutOptions`](README.md#cutoptions) |

#### Returns

`Promise`<`void`\>

#### Defined in

[functions/cut.ts:4](https://github.com/Angael/dunes-node/blob/d38da99/src/functions/cut.ts#L4)
