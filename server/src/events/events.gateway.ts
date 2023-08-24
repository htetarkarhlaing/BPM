import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: WebSocket) {
    console.log('Client connected:', client);
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }
}
