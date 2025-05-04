
// ! WILL BE USED IF NEED A WORKING LOGIN
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
  
    static remove(key) 
    {
        localStorage.removeItem(key)
    }
  
    static clear() 
    {
        localStorage.clear()
    }
}