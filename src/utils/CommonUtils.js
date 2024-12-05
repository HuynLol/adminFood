import * as XLSX from 'xlsx/xlsx.mjs'
class CommonUtils 
{
    static exportExcel(data, namesheet, namefile)
    {
        return new Promise((res,rej) =>
            {
                var wb = XLSX.utils.book_new();
                var ws=  XLSX.utils.json_to_sheet(data)
                XLSX.utils.book_append_sheet(wb,ws,namesheet);
                XLSX.writeFile(wb,`${namefile}.xlsx`)
                res('oke')
            })
        
    }
}