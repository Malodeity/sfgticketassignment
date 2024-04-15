import { Status } from '@prisma/client';
import React from 'react'

const StatusDisplay = ({status}) => {
    const getColor = (status:Status) => {
        let color = 'bg-slate-700';
        
        switch(status.description.toLowerCase()){
            case 'done':
                color = 'bg-green-200';
                return color;
            case 'started':
                color = 'bg-yellow-200';
                return color;
            case 'not started':
                color = 'bg-red-200';
                return color;
        }
        return color;
    }
  return (
    <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(status)}`}>
        {status.description}
    </span>
  )
}

export default StatusDisplay