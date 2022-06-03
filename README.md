# FB60FPS-CLI
- Alias: Facebook60FPS-CommandLineInterface

## 1. Installation : `npm install -g fb60fps-cli`

## 2. Usage
```
$ fb60fps

Usage: fb60fps -i <input> -o <output>


Options:
      --help           Show help                                       [boolean]
      --version        Show version number                             [boolean]
  -i, --input          Input file                            [string] [required]
  -o, --output         Output file                           [string] [required]
  -e, --encoder        Encoder
            [string] [choices: "cpu", "nvidia", "intel", "amd"] [default: "cpu"]
      --qp             Quality                          [number] [default: "28"]
  -p, --preset         Preset
      [string] [choices: "ultrafast", "superfast", "veryfast", "faster", "fast",
          "medium", "slow", "slower", "veryslow", "placebo"] [default: "medium"]
      --br, --bitrate  Bitrate                        [number] [default: "1500"]

```

### For example:
```
$ fb60fps --input /path/to/input_video.mp4 --output /path/to/output_video.mp4 
```

# Notice

Please **make sure** FFmpeg is installed system-wide, fb60fps **does not come with FFmpeg installed.**

This is still a new thing so there **will be bugs**, please report at [repo issues page](https://github.com/JinPots/fb60fps-cli/issues)

## Thanks for using my package!