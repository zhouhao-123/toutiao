// 封装本地存储

// 存储数据
export const setStorageItem = (key, value)=> {
    // 将数组或者对象转化为JSON格式的字符串进行存储
    if(typeof value === 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 获取数据
export const getStorageItem = (key) => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

// 删除数据
export const removeStorageItem = (key) => {
    window.localStorage.removeItem(key)
}
