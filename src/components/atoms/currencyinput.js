import React from "react";

export const CurrencyInput = (value) => {
    //let value = e.target.value;

    var number_string = value.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    if(ribuan){
		const separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

    value = rupiah
    return value
}