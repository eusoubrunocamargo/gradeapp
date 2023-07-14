import styles from '@/styles/AcademicModal.module.css';
import Image from "next/image";
import BtnNextPrevious from '../btnNextPrevious';
import { useEffect, useState, useRef, use } from 'react';
import Close from '../../../public/close_neutral.svg';
import { useUserData } from '@/hooks/useUserData';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if(chartRef && chartRef.current){
            const chartInstance = new Chart(chartRef.current, {
                type: 'pie',
                data: {
                    labels: data.map(item => item.grade),
                    datasets: [{
                        data: data.map(item => item.count),
                        backgroundColor: [
                            '#F45151',
                            '#FFC107',
                            '#7D0',
                        ],
                    }],
                },
                options: {
                    responsive: false,
                },
            });

            return () => {
                chartInstance.destroy();
            };
        }
    }, [chartRef, data]);

    return (
        <canvas ref={chartRef}></canvas>
    );
};


export default function AcademicModal({ handleAcademicModal }) {

    const { updatedUserUniqueClasses } = useUserData();
    const finishedClasses = updatedUserUniqueClasses.filter(item => item.grade !== null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const chartData = finishedClasses.reduce((acc, item) => {
            const existingItem = acc.find(i => i.grade === item.grade);
            if (existingItem) {
                existingItem.count++;
            } else {
                acc.push({
                    grade: item.grade,
                    count: 1,
                });
            }
            return acc;
        }, []);
        setChartData(chartData);
    }, [updatedUserUniqueClasses]);

    // console.log(chartData);

    const [currentPage, setCurrentPage] = useState(0);
    const classesPerPage = 4;
    const startIndex = currentPage * classesPerPage;
    const selectedClasses = finishedClasses.slice(startIndex, startIndex + classesPerPage);
    const handlePrevPage = () => {
        setCurrentPage(old => Math.max(old - 1, 0));
    };
    const handleNextPage = () => {
        setCurrentPage(old => Math.min(old + 1, Math.ceil(finishedClasses.length/classesPerPage) - 1));
    };

    //graph config

    return (
        <>
        <section className={styles.containerBack}>
            <section className={styles.containerModal}>
                <button className={styles.btnClose} onClick={handleAcademicModal}><Image src={Close} width={30} height={30} alt='close'/></button>
                <section className={styles.containerGrid}>
                    
                    <h3>Desempenho Acadêmico</h3>

                    <section className={styles.greetingBox}>
                        <h3>MATÉRIAS</h3>
                        <div className={styles.containerBtn}>
                            {/* <div className={styles.searchWrapper}>
                                <select name='searchbox' id='searchbox'>
                                    <option></option>
                                    <optgroup label='Em andamento'>

                                    </optgroup>
                                    <optgroup label='Finalizadas'>

                                    </optgroup>
                                </select>
                                <label htmlFor='searchbox'><Image src={DarkSearch} width={20} height={20} alt='search'/></label>
                            </div> */}
                            <BtnNextPrevious onClick={handlePrevPage} direction={'left'}/>
                            <BtnNextPrevious onClick={handleNextPage} direction={'right'}/>
                        </div>
                    </section>

                    <section className={styles.containerClasses}>
                        {selectedClasses.map((item, index) => (
                            <div key={index} className={styles.classBox}>
                                <span>{item.class_name}</span>
                                <p>{item.grade}</p>
                            </div>
                        ))}
                    </section>

                    <section className={styles.containerGraph}>
                        {chartData.length > 0 && <PieChart data={chartData}/>}
                    </section>


                </section>
            </section>
        </section>
        </>
    )

}