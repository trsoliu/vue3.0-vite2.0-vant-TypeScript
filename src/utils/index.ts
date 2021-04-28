// import { store } from '@/store'
import { AxiosResponse } from 'axios'

// @TODO: children使用动态属性
export interface NestedObj<T> {
  [k: string]: any
  children: Array<NestedObj<T>>
}

// @TODO: 添加children参数
/**
 * 多维嵌套对象数组展平为一维对象数组
 * @param array
 */
export function flatObjectArray<T>(array: Array<NestedObj<T>>): Array<NestedObj<T>> {
  const res: Array<NestedObj<T>> = []
  function recursive(target: Array<NestedObj<T>>) {
    target.forEach((item: NestedObj<T>) => {
      res.push(item)
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty('children') && item.children.length) {
        recursive(item.children)
      }
    })
  }
  recursive(array)
  return res
}

/**
 * 把双引号转义成反斜杠加双引号，即 `"` 转义成 `\"`
 * @param str
 */
export function escapeQuote(str: string): string {
  return str.replace(/"/g, '\\"')
}

/**
 * 移除字符串中的反斜杠 `\`
 * @param str
 */
export function removeBackslash(str: string): string {
  return str.replace(/\\/g, '')
}

/**
 * 下载文件
 * @param blob 要下载为文件的blob对象
 * @param filename 要下载的文件名称
 */
export function downloadFile(blob: Blob, filename: string) {
  const a = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

/**
 * 封装根据axios response下载流文件的过程
 * @param response 原始数据
 * @param FileName 自定义文件文件名称
 */
export function downloadFileFromResponse(response: AxiosResponse,FileName:string) {
  const blob = response.data.data
  const headers = response.headers
  // 研发环境和线上环境返回的头大小写不一样...
  const disposition = headers['Content-disposition'] || headers['content-disposition'] || ''
  // const disposition = headers["Content-disposition"] || "";
  let filename = disposition.split('filename=')[1]
  filename = decodeURI(escape(filename))
  // console.log('disposition,filename', disposition, FileName?FileName:filename)
  downloadFile(new Blob([blob], {type: headers['content-type']}), FileName?FileName:filename)
}

/**
 * blob对象转换为json
 * @param blob 要转换的
 */
export function blob2Json(blob: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(blob)
    reader.onload = (e: any) => {
      // console.log(e)
      resolve(JSON.parse(e.target.result as string))
    }
  })
}

/**
 * 求数字数组中的中位数算法
 * @param arr
 */
export function median(arr: number[]): number {
  arr.sort()
  if (arr.length % 2 === 0) {
    return (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
  } else {
    return arr[Math.floor(arr.length / 2)]
  }
}

/**
 * 深拷贝，直接简单用了
 */
export function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 复制到剪贴板
 * @param value 要复制的字符串
 */
export function copyToClipboard(value: string): Promise<boolean> {
  const input = document.createElement('textarea')
  input.style.position = 'absolute'
  input.style.top = '9999px'
  document.body.appendChild(input)
  input.value = value
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
  return Promise.resolve(true)
}
