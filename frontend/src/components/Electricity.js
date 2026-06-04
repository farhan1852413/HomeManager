import { Chart as ChartJS} from "chart.js/auto";
import { Bar } from "react-chartjs-2"

const Electricity = () => {
    return (
        <div className="p-2">
            <h1 className="text-left m-2">Electric Usage</h1>
            <Bar className="text-white mt-2 scale-95" data={{
                        labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        datasets: [
                            {
                                label: "Electricity",
                                data: ["50", "100", "150", "200", "250", "300", "350"],
                                tension: 0.4,
                                borderColor: '#C26EB4',
                                borderWidth: 2,
                                backgroundColor: '#C26EB4',
                                pointBackgroundColor: '#C26EB4',
                                pointStyle: 'circle',
                            },
                        ]
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    usePointStyle: true,
                                    
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    color: 'white'
                                }
                            },
                            y: {
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    color: 'white'
                                }
                            }
                        },
                    }}
                    />
        </div>
    )
}

export default Electricity