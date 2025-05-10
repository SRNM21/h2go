export class Session 
{
    static set(key, value) 
    {
        localStorage.setItem(key, JSON.stringify(value))
    }
  
    static get(key) 
    {
        const value = localStorage.getItem(key)

        try 
        {
            return JSON.parse(value)
        } 
        catch (e)
        {
            return value
        }
    }

    static getAll() 
    {
        const all = {}
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            all[key] = this.get(key)
        }
        return all
    }
  
    static remove(key) 
    {
        localStorage.removeItem(key)
    }
  
    static clear() 
    {
        localStorage.clear()
    }
}