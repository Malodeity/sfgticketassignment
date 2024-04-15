import { faFire } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PriorityDisplay = ({priority}) => {
  return (
    <div>
        <FontAwesomeIcon 
            icon={faFire}
            className={`pr-1 ${priority.level > 0 ? "text-red-400" : "text-slate-400"} `} 
        />
        <FontAwesomeIcon 
            icon={faFire}
            className={`pr-1 ${priority.level > 1 ? "text-red-400" : "text-slate-400"} `} 
        />
        <FontAwesomeIcon 
            icon={faFire}
            className={`pr-1 ${priority.level > 2 ? "text-red-400" : "text-slate-400"} `} 
        />
        <FontAwesomeIcon 
            icon={faFire}
            className={`pr-1 ${priority.level > 3 ? "text-red-400" : "text-slate-400"} `} 
        />
        <FontAwesomeIcon 
            icon={faFire}
            className={`pr-1 ${priority.level > 4 ? "text-red-400" : "text-slate-400"} `} 
        />
    </div>
  )
}

export default PriorityDisplay