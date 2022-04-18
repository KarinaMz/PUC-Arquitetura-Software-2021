package com.boaentrega.mic.service;

import com.boaentrega.mic.domain.dto.DistanciaDTO;
import com.boaentrega.mic.domain.dto.EnderecoDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DistanceServiceImpl {

    public static final String GOOGLE_API_KEY = "-";
    private OkHttpClient client = new OkHttpClient();

    public void verificarDistancias(DistanciaDTO dto) throws IOException {
       String respostaAPI = chamarAPIGoogle(getEnderecoUrl(dto.getLocalAtual()), getEnderecoUrl(dto.getDeposito()));
       JsonNode jsonNode = new ObjectMapper().readTree(respostaAPI);
       String status = jsonNode.findValue("status").textValue();
       if(status.equals("OK")){
           JsonNode elements = jsonNode.findValue("rows").findValues("elements").get(0);
           String distanciaAteDeposito = elements.findValue("distance").findValue("text").textValue();
           String tempoAteDeposito = elements.findValue("duration").findValue("text").textValue();
           dto.setDistanciaAteDeposito(distanciaAteDeposito);
           dto.setTempoAteDeposito(traduzirTextoTempo(tempoAteDeposito));
       }

       respostaAPI = chamarAPIGoogle(getEnderecoUrl(dto.getDeposito()), getEnderecoUrl(dto.getDestino()));
       jsonNode = new ObjectMapper().readTree(respostaAPI);
       status = jsonNode.findValue("status").textValue();
       if(status.equals("OK")) {
           JsonNode distanciaDois = jsonNode.findValue("rows").findValues("elements").get(0);
           String distanciaDepositoDestino = distanciaDois.findValue("distance").findValue("text").textValue();
           String tempoDepositoDestino = distanciaDois.findValue("duration").findValue("text").textValue();
           dto.setDistanciaDepositoDestino(distanciaDepositoDestino);
           dto.setTempoDepositoDestino(traduzirTextoTempo(tempoDepositoDestino));
       }
    }

    private String chamarAPIGoogle(String origem, String destino) throws IOException {
        String url="https://maps.googleapis.com/maps/api/distancematrix/json?origins="+origem+"&destinations="
                +destino+"&key="+ GOOGLE_API_KEY;
        Request request = new Request.Builder()
                .url(url)
                .build();

        Response response = client.newCall(request).execute();
        return response.body().string();
    }

    private String traduzirTextoTempo(String tempo){
        return tempo.replace("hours", "horas").replace("mins", "minutos");
    }

    private String getEnderecoUrl(EnderecoDTO enderecoDTO){
        return enderecoDTO.getCep();
    }
}
