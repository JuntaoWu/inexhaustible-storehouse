
namespace ies {

    export class SoundPool {

        public static musicClips: {} = {};
        private static _volumeBGM: number = 1;
        public static get volumeBGM() {
            return SoundPool._volumeBGM;
        }
        public static set volumeBGM(v: number) {
            SoundPool._volumeBGM = v;
            for (let key in SoundPool.musicClips) {
                SoundPool.musicClips[key].volume = v;
            }
        }

        public static playSoundEffect(soundName: string, volume: number): egret.SoundChannel {
            let sound: egret.Sound = RES.getRes(soundName);
            if (!sound) {
                console.error(`playSoundEffect: Unable to load sound: ${soundName}`);
                return;
            }
            console.log(soundName);
            let soundChannel: egret.SoundChannel = sound.play(0, 1);
            soundChannel.volume = volume;

            return soundChannel;
        }

        public static stopBGM() {
            for (var name in SoundPool.musicClips) {
                if (SoundPool.musicClips.hasOwnProperty(name)) {
                    let chanel: egret.SoundChannel = SoundPool.musicClips[name];
                    chanel.stop();
                }
            }
        }

        public static playBGM(soundName: string, startTime: number = 0): egret.SoundChannel {

            SoundPool.stopBGM();

            let music: egret.Sound = RES.getRes(soundName);

            if (!music) {
                console.error(`playBGM: Unable to load music: ${soundName}`);
                return;
            }

            SoundPool.musicClips[soundName] = music.play(startTime);
            SoundPool.musicClips[soundName].volume = SoundPool.volumeBGM;

            return SoundPool.musicClips[soundName];
        }
    }
}