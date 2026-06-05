import { Document, Text, View } from '@react-pdf/renderer';
import React from 'react'

const DurationConverterPdf = ({duration}) => {
    const convertToHoursMinutes = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return { hours, minutes };
      };
    
      const { hours, minutes } = convertToHoursMinutes(duration);
      // 
  return (
    <Document>
    <View>
  <Text>
  {hours}H {minutes}Min.
  </Text>

</View>
  </Document>
  )
}

export default DurationConverterPdf
