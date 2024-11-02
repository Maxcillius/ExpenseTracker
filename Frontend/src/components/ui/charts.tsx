import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from 'chart.js'
import { useRecoilValue } from 'recoil'
import { categoryNameMap } from '../../atoms/Data'
import Expenses from '../../types/expenses'
import Category from '../../types/category'
import { categoriesAtom } from '../../atoms/Data'


ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default function Charts({ dataset }: { dataset: Expenses[]}) {

  const categoriesNameMap = useRecoilValue(categoryNameMap)
  const colorSet = useRecoilValue(categoriesAtom)
  const nameAmountMap: Map<string, number> = new Map()
  const nameColorMap: Map<string, string> = new Map()

  dataset.map((data: Expenses) => {
    if(nameAmountMap.has(data.category_id)) {
      //@ts-ignore
      nameAmountMap.set(data.category_id, nameAmountMap.get(data.category_id) + data.amount)
    } else {
      nameAmountMap.set(data.category_id, data.amount)
    }
  })

  colorSet.map((data: Category) => {
    if(!nameColorMap.has(data.id)) {
      nameColorMap.set(data.id, data.color)
    }
  })

  var labels: string[] = []
  var amounts: number[] = []
  var colors: string[] = []

  nameAmountMap.forEach((value, key) => {
    labels.push(categoriesNameMap.get(key) as string)
    amounts.push(value)
    colors.push(nameColorMap.get(key) as string)
  })

  const info = {
    labels: labels,
    datasets: [
      {
        label: 'Category',
        data: amounts,
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  }


  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className='flex flex-col justify-center md:h-[600px] p-2'>
        <div className="chart-container xl:w-[500px] xl:h-[500px] w-[300px] h-[300px] self-center">
            <Pie data={info} options={options} />
        </div>
    </div>
  )
}
