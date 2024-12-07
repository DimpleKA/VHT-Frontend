export const timeConversion = async (serverTime) => {
    try {
      // Parse the server time as a Date object
      const serverDate = new Date(serverTime);
  
      // Get the current date in IST by converting serverDate to the local time zone of India
      const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric' };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
  
      // Get formatted time in IST
      const localTime = formatter.format(serverDate);
  
      // Get today's date in IST for comparison
      const todayIST = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'numeric', year: 'numeric' }).format(new Date());
  
      // Format serverDate to IST
      const serverISTDate = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'numeric', year: 'numeric' }).format(serverDate);
  
      if (todayIST === serverISTDate) {
        // If the date is today, return the time in hh:mm am/pm format
        return localTime;
      } else {
        // If the date is not today, return it in "date monthName, year" format
        const longDateOptions = { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('en-IN', longDateOptions).format(serverDate);
      }
    } catch (error) {
      console.error('Error converting time:', error);
      return null; // Handle error and return null or an appropriate fallback
    }
  };
  