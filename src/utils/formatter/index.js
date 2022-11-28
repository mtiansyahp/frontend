const formatRupiah = (value, useSymbol) => {
  if(value) {
    let number_string = value.toString().replace(/[^,\d]/g, '').toString()
    let split = number_string.split(',')
    let remainder	= split[0].length % 3
    let rupiah = split[0].substr(0, remainder)
    let thousand = split[0].substr(remainder).match(/\d{3}/gi)

    if(thousand) {
      let separator = remainder ? '.' : ''
      rupiah += separator + thousand.join('.')
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
    return rupiah && useSymbol ? 'Rp ' + rupiah : rupiah && !useSymbol ? rupiah : 0
  } else {
    return '-'
  }
}

const formatDollar = (value, useSymbol) => {
  if(value) {
    let number_string = value.toString().replace(/[^,\d]/g, '').toString()
    let split = number_string.split('.')
    let remainder	= split[0].length % 3
    let dollar = split[0].substr(0, remainder)
    let thousand = split[0].substr(remainder).match(/\d{3}/gi)

    if(thousand) {
      let separator = remainder ? '.' : ''
      dollar += separator + thousand.join('.')
    }

    dollar = split[1] != undefined ? dollar + ',' + split[1] : dollar
    return dollar && useSymbol ? '$ ' + dollar : dollar && !useSymbol ? dollar : 0
  } else {
    return ''
  }
}

const formatToURL = (value) => {
  return value.replace(/\s+/g, '-').toLowerCase()
}

export {
  formatToURL,
  formatRupiah,
  formatDollar,
}