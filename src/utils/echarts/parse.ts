import { defaultColor } from './color'

interface PieSeriesItem {
  name: string
  value: number
}

export function parsePieOptions(seriesData: PieSeriesItem[], seriesName: string) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      itemWidth: 8,
      itemHeight: 8,
      left: 190,
      top: 'center',
      icon: 'circle',
      data: seriesData.map((item) => item.name),
      formatter: function (name: any) {
        const index = seriesData.findIndex((item) => item.name === name)
        const value = seriesData[index].value
        return `${name}  ${value}`
      },
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        // roseType: 'radius',
        center: [80, '50%'],
        radius: ['50%', '70%'],
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        color: defaultColor,
        data: seriesData,
      },
    ],
  }
}

export function parsePie2Options(seriesData: PieSeriesItem[], seriesName: string) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      itemWidth: 8,
      itemHeight: 8,
      left: 390,
      // right: 0,
      top: 'center',
      icon: 'circle',
      data: seriesData.map((item) => item.name),
    },
    series: [
      {
        name: seriesName,
        type: 'pie',
        // center: ['50%', '50%'],
        // radius: ['0%', '70%'],
        center: [200, '50%'],
        radius: ['0%', '40%'],
        label: {
          show: true,
          formatter: '{b}:\n{c} ({d}%)',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
        labelLine: {
          show: true,
        },
        color: defaultColor,
        data: seriesData,
      },
    ],
  }
}
