package com.suntech.desafio.services;

import com.suntech.desafio.model.Residencia;

public class ResidenciaService {

	public static boolean validaDados(Residencia data) {
		if (data.getCep() < 10000000 
				|| data.getNumero() == 0 
				|| data.getResidentes() == 0 
				|| data.getLatitude() == 0.0
				|| data.getLongitude() == 0.0) {
			return false;
		}
		return true;
	}
}
