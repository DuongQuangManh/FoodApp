import io from 'socket.io-client';
import { URL } from './api';

class WSService {
    socket: any;
    initializeSocket = async () => {
        try {

            this.socket = io(URL, {
                transports: ['websocket']
            })
            console.log("initializing socket", this.socket)

            this.socket.on('connect', (data: any) => {
                console.log("=== socket connected ====")
            })

            this.socket.on('disconnect', (data: any) => {
                console.log("=== socket disconnected ====")
            })

            this.socket.on('error', (data: any) => {
                console.log("socekt error", data)
            })

        } catch (error) {
            console.log("scoket is not inialized", error)
        }
    }

    emit(event: any, data: string) {
        this.socket.emit(event, data)
    }

    on(event: any, cb: any) {
        this.socket.on(event, cb)
    }

    removeListener(listenerName: any) {
        this.socket.removeListener(listenerName)
    }

}

const socketServcies = new WSService()

export default socketServcies