export const timeConversion = async (serverTime) => {
    try {
      // Parse the server time as a Date object
      const serverDate = new Date(serverTime);
  
      // Convert server time to IST (GMT+5:30)
      const indianOffset = 5.5 * 60 * 60 * 1000; // Offset in milliseconds
      const localDate = new Date(serverDate.getTime() + indianOffset);
  
      // Get the current date in IST
      const currentISTDate = new Date(new Date().getTime() + indianOffset);
      const isToday = localDate.toDateString() === currentISTDate.toDateString();
  
      if (isToday) {
        // If the date is today, return the time in hh:mm am/pm format
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  
        return `${formattedHours}:${minutes} ${ampm}`;
      } else {
        // If the date is not today, return it in "date monthName, year" format
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return localDate.toLocaleDateString('en-IN', options);
      }
    } catch (error) {
      console.error('Error converting time:', error);
      return null; // Handle error and return null or an appropriate fallback
    }
  };
  