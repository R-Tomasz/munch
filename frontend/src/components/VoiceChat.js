import React, {useEffect, useState} from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import {APP_ID, CHANNEL_NAME, TEMP_TOKEN} from '../api/voiceConstants'
import {Button} from "reactstrap";
import '../styles/VoiceChat.css'


const VoiceChat = () => {
    const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'});
    const [localTrack, setLocalTrack] = useState(null);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);

    useEffect(() => {
        initializeAgora();
    }, []);

    const initializeAgora = async () => {
        if (!client) return;
        try {
            await client.join(APP_ID, CHANNEL_NAME, TEMP_TOKEN, null);
            const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();
            setLocalTrack(microphoneTrack);
            await client.publish(microphoneTrack);

            if (client) {
                client.on('user-published', handleUserPublished);
                client.on('user-left', handleUserLeft);
            }
        } catch (error) {
            console.error('Agora initialization error:', error);
        }
    };

    const handleUserPublished = async (user, mediaType) => {
        if (mediaType === 'audio' && client) {
            try {
                await client.subscribe(user, mediaType);
                user.audioTrack.play();
            } catch (error) {
                console.error('Error subscribing to user:', error);
            }
        }
    };

    const handleUserLeft = async () => {
        try {
            if (localTrack) {
                localTrack.stop();
                localTrack.close();
            }
            if (client) {
                await client.leave();
            }
        } catch (error) {
            console.error('Error while leaving:', error);
        }
    };

    const toggleMicrophone = async () => {
        if (localTrack) {
            if (isMicrophoneOn) {
                await localTrack.setEnabled(false);
            } else {
                await localTrack.setEnabled(true);
            }
            setIsMicrophoneOn(!isMicrophoneOn);
        }
    };

    return (
        <div className={"voiceChat-container"}>
            <Button className={'btn-default'} onClick={toggleMicrophone}>
                {isMicrophoneOn ? 'Wyłącz mikrofon' : 'Włącz mikrofon'}
            </Button>
        </div>
    );
};

export default VoiceChat;