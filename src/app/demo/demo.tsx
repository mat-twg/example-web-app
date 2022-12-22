'use client';

import { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Entity, TableContext } from './table';

const Demo = ({ data }: { data: Entity[] }) => {
  const table = useContext(TableContext);
  useEffect(() => {
    table.load(data);

    return () => table.reset();
  }, [table, data]);

  const [entityData, setEntityData] = useState<string>();
  const [connection, setConnection] = useState<Socket>();

  useEffect(() => {
    if (!connection) {
      const socket = io('http://localhost:3000', { transports: ['websocket'] });
      socket.on('data-source', setEntityData);
      setConnection(socket);
    }

    return () => {
      connection ? connection.disconnect() : null;
    };
  }, [connection]);

  return entityData
    ? table.update(JSON.parse(entityData)).render()
    : table.render();
};

export default Demo;
