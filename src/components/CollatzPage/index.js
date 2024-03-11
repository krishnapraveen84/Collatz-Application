import { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './index.css'
class CollatzGraph extends Component {
    state = {
      startNumber: 5, 
      collatzSequenceData: [],
    }


  
  handleInputChange = (event) => {
    this.setState({ startNumber: event.target.value });
  }

  calculateCollatzSequence = (startNumber) => {
    let sequence = [{ iteration: 0, value: startNumber }]; 
    let currentNumber = startNumber;

    while (currentNumber !== 1) {
      if (currentNumber % 2 === 0) {
        
        currentNumber = currentNumber / 2;
      } else {
        
        currentNumber = currentNumber * 3 + 1;
      }
      sequence.push({ iteration: sequence.length, value: currentNumber }); 
    }

    return sequence;
  }

 
  handleSubmit = (event) => {
    event.preventDefault();
    const startNumber = parseInt(this.state.startNumber, 10);
    const collatzSequenceData = this.calculateCollatzSequence(startNumber);
    this.setState({ collatzSequenceData });
  }

  render() {
    const {collatzSequenceData} = this.state
    return (
      <div className='bg-container'>
        <h1 className='heading'>Collatz <span className='heading-heigh'>Graph</span></h1>
        <form className='form-container' onSubmit={this.handleSubmit}>
         <div > 
            <div className='input-container'><label className='label'>
                Start Number :
            </label>
            <input className='input' type="number" value={this.state.startNumber} onChange={this.handleInputChange} /></div>
          </div>
          <button className='submit-btn' type="submit">Generate Sequence</button>
        </form>
        <div className='graph-container-lg'>
          <LineChart
            width={800}
            height={400}
            data={collatzSequenceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="iteration" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className='graph-container-sm'>
          <LineChart
            width={550}
            height={400}
            data={collatzSequenceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="iteration" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <h3 className='sub-heading'>Sequence Numbers :</h3>
        <ul className='sequecnce-container'>
          {collatzSequenceData.map(each => <li key={`${each.value}id`} className='seq-nums'>{each.value}</li>)}
      </ul>
      </div>
    );
  }
}

export default CollatzGraph;