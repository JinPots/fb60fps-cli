#! /usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv

const usage = "\nUsage: fb60fps -i <input> -o <output>\n";
const options = yargs
        .usage(usage)
        .option("i", {
            alias: "input",
            describe: "Input file",
            type: "string",
            demandOption: true
        })
        .option("o", {
            alias: "output",
            describe: "Output file",
            type: "string",
            demandOption: true
        })
        .option("e", {
            alias: "encoder",
            describe: "Encoder",
            type: "string",
            default: "cpu",
            choices: ["cpu", "nvidia", "intel", "amd"]
        })
        .option("qp", {
            describe: "Quality",
            type: "number",
            default: "28"
        })
        .option("p", {
            alias: "preset",
            describe: "Preset",
            type: "string",
            default: "medium",
            choices: ["ultrafast", "superfast", "veryfast", "faster", "fast", "medium", "slow", "slower", "veryslow", "placebo"]
        })
        .option("br", {
            alias: "bitrate",
            describe: "Bitrate",
            type: "number",
            default: "1500"
        })
        .option('rc', {
            alias: 'rc',
            describe: 'RC-lookahead',
            type: 'number',
            default: '15'
        })
        .argv;

const input = argv.input || argv.i;
const output = argv.output || argv.o;

const { exec } = require('child_process');

function checkFFmpeg () {
    let check = exec('ffmpeg -version')
    check.on('exit', (code) => {
        if (code === 0) {
            console.log('\nFFmpeg found!')
            return
        } else {
            return console.log('\nMissing FFmpeg, please install!')
        }
    })
}

const fs = require('fs')

function checkVideo () {
    try {
        const a = fs.readFileSync(input)
        return '0'
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('\nVideo not found!')
            return
        }
    }
}

function checkShit () {
    checkFFmpeg()
    checkVideo()
}


function render () {
	let videoOutputPath = output
	let args = []

	let fileSelect = input
	let fileName = input.split('.')[0]

	if (process.platform === 'win32') {
		args.push('-i', `"${fileSelect}"`)
	} else {
		args.push('-i', `${fileSelect}`)
	}

	if (yargs.argv.encoder === 'cpu') {
		args.push('-c:v', 'libx264')
	} else if (yargs.argv.encoder === 'nvidia') {
		args.push('-c:v', 'h264_nvenc')
	} else if (yargs.argv.encoder === 'intel') {
		args.push('-c:v', 'h264_qsv')
	} else if (yargs.argv.encoder === 'amd') {
		args.push('-c:v', 'h264_amf')
	}
	args.push('-qp', yargs.argv.qp) 
	args.push('-preset', yargs.argv.preset)
	let bitrate = (yargs.argv.bitrate / 1000).toFixed(1) + 'M'
	args.push('-b:v', bitrate)
	args.push('-maxrate', bitrate)
	args.push('-rc-lookahead', yargs.argv.rc)
	args.push('-vf', `scale=-1:720`)

    args.push(videoOutputPath)
	args.push('-y')

    console.log(args)
    ffmpegProcess = exec(`ffmpeg ${args.join(' ')}`) 
	

	ffmpegProcess.stderr.on('data', (data) => {
        console.log(data)
	})

    ffmpegProcess.on('error', (e) => {
		console.log(e)
	})

	ffmpegProcess.on('close', (code) => {
		if (code == 0) {
            console.log('\nRender finished!')
            return
        }
        console.log('\nRender failed!')
        return
	})
}

function main () {
    checkShit()
    render()
}

main()