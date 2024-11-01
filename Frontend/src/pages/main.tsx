import Navbar from "../components/navbar"
import App from "../App"
import Analysis from "./Analysis"
import Settings from "./Settings"

export default function Main({name}: {name: string}) {
    return (
        <>
            <Navbar />
            {
                GetElement({name})
            }
        </>
    )
}

function GetElement({ name }: {name: string}) {
    switch(name) {
        case 'Dashboard':
            return <App />
        case 'Analysis':
            return <Analysis />
        case 'Settings':
            return <Settings />
    }
}