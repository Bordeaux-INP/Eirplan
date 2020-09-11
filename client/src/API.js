import axios from "axios";
const burl = "http://localhost:3008";


export default {
    getEventData: async function(eventData){
        console.log('eventData', eventData);
        const output = await axios.get(
            burl + "/interactiveDisplay",
            {
                eventData: eventData
            }
        );
        console.log('eventData', output);
        return output;
    },
}