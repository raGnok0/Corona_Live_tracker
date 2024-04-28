import React ,{useEffect,useState}from "react";
import './covid19.css';

function Covid(){
    const [data,stateData]= useState([]);
    const [dist, distData] = useState([]);
    const [localdata,distLocal] = useState([]);
    const distD = Object.keys(dist); //converting an Object to an array 
    // console.log("dist keys "+ distD[0]);
    // distD.map(e => console.log(e));
    let distStateHandler = null;
    let distHandler = ()=>{
        distStateHandler = document.getElementById('district').value;
        distLocal(dist[distStateHandler].total)
        console.log("dist from option"+ distStateHandler+ typeof(distStateHandler))
    }
    // let distValue = dist[distStateHandler].total;

    async function getCovidData(){
        try {
            const raw_data = await fetch("https://data.covid19india.org/v4/min/data.min.json");
            const data = await raw_data.json();
            stateData(data.WB.total)
            distData(data.WB.districts)
            console.log(data.WB)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getCovidData();
    },[])
    
    return(
        <section>
            <div className="tag">
                <span>Live Covid 19 Tracker</span>
            </div>
            <div className="dropdown">
                <select onChange={distHandler} name="" id="district">
                    <option value="">--Select an option--</option>
                    {distD.map(e => <option value={e}>{e}</option>)}
                </select>
            </div>
            <div className="card">
                <div className="card_tag">
                    <span>Our Country</span>
                </div>
                <div className="card_data">INDIA</div>
            </div>
            <div className="card">
                <div className="card_tag">
                    <span>Confirmed Cases in</span>
                </div>
                <div className="card_data">{localdata.confirmed}</div>
            </div>
            <div className="card">
                <div className="card_tag">
                    <span>Recovered Cases</span>
                </div>
                <div className="card_data">{localdata.recovered}</div>
            </div>
            <div className="card">
                <div className="card_tag">
                    <span>Vaccinated</span>
                </div>
                <div className="card_data">{localdata.vaccinated1}</div>
            </div>
        </section>
    )
}

export default Covid;