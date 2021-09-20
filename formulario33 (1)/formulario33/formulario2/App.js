//import ModalDropdown from 'react-native-modal-dropdown';
import React, { useState } from 'react';

import { StyleSheet, Text, View, FlatList,TextInput ,ScrollView, Button, Alert, Modal, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import config from './config/config.json';
import moment from 'moment';
import Listitem from './src/pages/Listitem/index';
//import { TextInput } from 'react-native-paper';


export default function App() {

  // Varieis da entradas dos inputs 
  const [horainicial, onChangeNumber] = useState(null);
  const [horafinal, onChangeNumber2] = useState(null);
  const [difhora, onChangeNumber3] = useState(null);
  const [peso, onChangeNumber4] = useState(null);
  const [texto, onChangeTexto] = useState(null);
  const [message, setMessage] = useState(null);

  //variaveis dos inputs hora impordutiva
  const [horainicial2, onChangeInicial] = useState(null);
  const [selectedcodimprodutivo, setSelectedCodImprodutivo] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);

  //variveis das pickers material e tarefas
  const [tarefa, setSelectedValue] = useState(null);
  const [material, setSelectedValue2] = useState(null);

  //varivel que muda o button iniciar para encerrar e salva no banco
  const [title, setTitle] = useState('Iniciar');

  // variavel de amarzenamento de informações do banco
  var [useponto, setUsePonto] = useState([]);


  // variaveis do formulario modal 
  const [selectedequipamento, setSelectedEquipamento] = useState(null);
  const [selectedturno, setSelectedTurno] = useState(null);
  const [continicial, onChangeTeste2] = useState(null);
  const [contfinal, onChangeTeste] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  //função para pegar hora automatico com o click do button iniciar e virar encerrar
  function iniciarHora() {
    setTitle('Encerrar')
    onChangeNumber(moment().format('HH:mm:ss'))
  }

  //Enviar dados formulario para o backend

  async function resgisterFormulario() {
    console.log(config.urlRootNode)
    onChangeNumber2(moment().format('HH:mm:ss'))
    let reqs = await fetch(config.urlRootNode + 'Formulario', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameTarefa: tarefa,
        nameHora: horainicial,
        nameHorafinal: horafinal,
        nameDifhora: difhora,
        namePeso: peso,
        nameTexto: texto,
        nameMaterial: material,
      })
    });
    let ress = await reqs.json();
    setMessage(ress);
  }

// enviar formoulario Hora improdutiva para o banco
  async function Horaimpordutiva() {
    console.log(config.urlRootNode)
    onChangeInicial(moment().format('HH:mm:ss'))
    let reqs = await fetch(config.urlRootNode + 'Horaimprodutiva', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        namecodHoraImprodutiva: selectedcodimprodutivo,
        nameHora: horainicial2,
        nameHorafinal: horafinal,
      })
    });
    let ress = await reqs.json();
   setMessage(ress);
  }

  // Enviar Formulario Ponto para o Backend  e atualiza renderização na flatlist
  async function resgisterPonto() {
    console.log(continicial)
    let reqs = await fetch(config.urlRootNode + 'Ponto', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameEquipamento: selectedequipamento,
        nameTurno: selectedturno,
        nameContinicial: continicial,
        nameContfinal: contfinal,
      })
    });
    let ress = await reqs.json();
    setMessage(ress);

    if (ress) {
      if (useponto.length > 0) {
        var id = useponto[useponto.length - 1].id
        let temp = {
          id: id + 1,
          tag: selectedequipamento,
          description: selectedturno,
          time1: continicial,
          time2: contfinal
        }

        useponto.push(temp)
        setUsePonto(useponto)
      } else {
        let temp = {
          id: 0,
          tag: selectedequipamento,
          description: selectedturno,
          time1: continicial,
          time2: contfinal
        }
        useponto.push(temp)
        setUsePonto(useponto)
      }

    }


  }

  //Requisita a informação do banco na tabela Ponto para exibir no frontend

  async function resgisterTeste() {
    console.log(config.urlRootNode)
    let reqs = await fetch(config.urlRootNode + 'teste', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teste: 'alo',
      })
    });
    let ress = await reqs.json();
    console.log(ress[0].id);
    ress.map(pontos => {
      let temp = {
        id: pontos.id,
        tag: pontos.equipamentos,
        description: pontos.turnos,
        time1: pontos.contInicial,
        time2: pontos.contFinal
      }
      useponto.push(temp)
    })
    setUsePonto(useponto)

    console.log(useponto)
  }

  //Variavel da Flastlist
  {/*  const tarefas = [
    {
      id: 1,
      tag: 'TAG: CD-051 CAMINHÃO BASCULANTE 6X4',
      time1: 'Contador Inicial: 1056',
      time2: 'Contador Final: 1056',
    },

  ];//*/}



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Text styles={styles.title}> Informação do Formulario </Text>

        {message && (
          <Text>{message}</Text>
        )}


        {/*  View que contendo a Flatlist onde e feita a renderização */}

        {/* <Text>{texto}</Text>*/}

        <FlatList
          //Renderização da flatlist
          horizontal
          data={useponto}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Listitem
              data={item}
            />

          )}
        />
        <Text styles={styles.title}> Formulario de Apontamento de Tarefa </Text>
        <View style={styles.picker}>

          {/* <ModalDropdown style={styles.dropdown} options={['Tarefa', 'Calcario', 'Ferro', 'Ouro', 'Cobre', 'Uranio']}>

        </ModalDropdown>*/}

          {/*  View que contendo a picker da lista de tarefas*/}
          <Picker

            // picker lista de materiais
            mode="dropdown"
            selectedValue={tarefa}
            style={{ height: 50, width: 375, margin: 10, }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Selecione Tarefa" value="" />
            <Picker.Item label="Extração de Calcario" value="Extração de Calcario" />
            <Picker.Item label="Transporte de Ferro" value="Transporte de Ferro" />
            <Picker.Item label="Descarga de Cobre" value="Descarga de Cobre" />
            <Picker.Item label="Carregamento de Ouro" value="Carregamento de Ouro" />
            <Picker.Item label="Trataemnto do Titanio" value="Trataemnto do Titanio" />
            <Picker.Item label="Controle do Uranio" value="Controle do Uranio" />

          </Picker>
        </View>
        {/*  View que contem os inputs de entrada de horas inicial, final, e diferencial */}

        <View style={styles.container3}>

          <TextInput
            //Input da hora inicial
             mode="outlined"
            editable={false}
            style={styles.input}
            onChangeText={onChangeNumber}
            value={horainicial}
            placeholderTextColor="#121212"
            placeholder=" Hora inicial"
            keyboardType="numeric"
          />

          <TextInput
            //Input da hora final
            editable={false}
            style={styles.input}
            onChangeText={onChangeNumber2}
            value={horafinal}
            placeholderTextColor="#121212"
            placeholder=" Hora Final"
            keyboardType="numeric"
          />

          <TextInput
            //Input do deferencial de hora
            editable={false}
            style={styles.input}
            onChangeText={onChangeNumber3}
            value={difhora}
            placeholderTextColor="#121212"
            placeholder=" Dif.Hora"
            keyboardType="numeric"
          />

        </View>
        <View style={styles.picker}>
          {/*  View que contem o input de entrada e saida de peso e a picker com as lista de materiais  */}

          <TextInput
            //Input da entrada de peso
            require={true}
            style={styles.input}
            onChangeText={onChangeNumber4}
            value={peso}
            placeholderTextColor="#121212"
            placeholder=" Peso"
            keyboardType="numeric"
          />

          <Picker
            // picker lista de materiais
            mode="dropdown"
            selectedValue={material}
            style={{ height: 50, width: 375, margin: 10, }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue2(itemValue)}
          >
            <Picker.Item label="Selecione Material" value="" />
            <Picker.Item label="Calcario" value="Calcario" />
            <Picker.Item label="Ferro" value="Ferro" />
            <Picker.Item label="Cobre" value="Cobre" />
            <Picker.Item label="Ouro" value="Ouro" />
            <Picker.Item label="Titanio" value="Titanio" />
            <Picker.Item label="Uranio" value="Uranio" />
          </Picker>

        </View>
        <View style={styles.container4}>
          {/*  View que contem o input do campo de observaçao  */}
          <TextInput
            style={styles.input2}
            outlined={true}
            multiline
            numberOfLines={3}
            onChangeText={onChangeTexto}
            value={texto}
            placeholderTextColor="#121212"
            placeholder=" Observação: "
            keyboardType="default"
          />
        </View>

        <View style={styles.fixToText}
        //View dos buttons 
        >

          <Button
            title={title}
            color="green"
            onPress={title === 'Iniciar' ? iniciarHora : resgisterFormulario
              //resgisterFormulario
            }
          />
          <Button
            title="Ponto "
            color="#FFFF00"
            onPress={() => setModalVisible(true)}
          />
          <Button
            title="Registro "
            color="red"
            onPress={() => setModalVisible2(true)}
          />
          <Button
            title="sair"
            color="gray"
            onPress={() => Alert.alert('Tarefa Finalizado')}
          />
        </View>



        <View style={styles.centeredView}>

          <Modal
            // Modal com o formulario do Ponto

            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >

            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <Picker
                  // picker lista de materiais
                  selectedValue={selectedequipamento}
                  style={{ height: 50, width: 375, margin: 10, }}
                  onValueChange={(itemValue, itemIndex) => setSelectedEquipamento(itemValue)}
                >
                  <Picker.Item label="Selecione equipamento" value="" />
                  <Picker.Item label="CD-051 CAMINHÃO BASCULANTE 6X4"
                    value="CD-051 CAMINHÃO BASCULANTE 6X4" />
                  <Picker.Item label="CD-059 CAMINHÃO transporte 6X4"
                    value="CD-059 CAMINHÃO transporte 6X4" />
                  <Picker.Item label="CD-060 Carro de vistoria"
                    value="CD-060 Carro de vistoria" />
                  <Picker.Item label="CD-055 Escavadeira"
                    value="CD-055 Escavadeira" />
                </Picker>


                <Picker
                  // picker lista de materiais
                  selectedValue={selectedturno}
                  style={{ height: 50, width: 375, margin: 10, }}
                  onValueChange={(itemValue, itemIndex) => setSelectedTurno(itemValue)}
                >
                  <Picker.Item label="Selecione Turno" value="" />
                  <Picker.Item label="1ª Turno" value="1ª Turno" />
                  <Picker.Item label="2ª Turno" value="2ª Turno" />
                  <Picker.Item label="3ª Turno" value="3ª Turno" />

                </Picker>

                <TextInput
                  //Input da Cont.inicial
                  editable={true}
                  style={styles.input3}
                  onChangeText={onChangeTeste2}
                  value={continicial}
                  placeholderTextColor="#121212"
                  placeholder=" Cont.inicial"
                  keyboardType="numeric"
                />

                <TextInput
                  //Input da Cont.final
                  editable={true}
                  style={styles.input3}
                  onChangeText={onChangeTeste}
                  value={contfinal}
                  placeholderTextColor="#121212"
                  placeholder=" Cont.final"
                  keyboardType="numeric"
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Button
                    // button de salvar Informações do formulario ponto no banco
                    title="Salvar "
                    color="green"
                    onPress={() => {
                      resgisterPonto()
                      //resgisterTeste()
                      setModalVisible(!modalVisible)

                    }}
                  />
                  <Button
                    // Button de cancelamento e para fechar o formulario ponto
                    title="Cancelar "
                    color="red"
                    onPress={() => Alert.alert('Tarefa Cancelada')}
                  />
                </View>

              </View>
            </View>
          </Modal>

        </View>



        <View style={styles.centeredView2}>

          <Modal
            // Modal com o formulario de Horas improdutivas

            animationType="slide"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              setModalVisible2(!modalVisible2);
            }}
          >

            <View style={styles.centeredView2}>
              <View style={styles.modalView2}>

                <Picker
                  // picker lista de tarefas improdutivas
                  selectedValue={selectedcodimprodutivo}
                  style={{ height: 50, width: 375, margin: 10, }}
                  onValueChange={(itemValue, itemIndex) => setSelectedCodImprodutivo(itemValue)}
                >
                  <Picker.Item label="Selecione codigo horas improdutivas" value="" />
                  <Picker.Item label="CD-051 Pneu Furado"
                    value="CD-051 Pneu Furado" />
                  <Picker.Item label="CD-044 Abstecimento"
                    value="CD-044 Abstecimento" />
                  <Picker.Item label="CD-060 Trafego parado"
                    value="CD-060 Trafego parado" />
                  <Picker.Item label="CD-075 Refeição"
                    value="CD-075 Refeição" />
                </Picker>

                <View style={styles.container4}>

                  <TextInput
                    //Input da hora de parada improdutiva
                    editable={false}
                    style={styles.input}
                    onChangeText={onChangeInicial}
                    value={horainicial2}
                    placeholderTextColor="#121212"
                    placeholder=" Hora inicial"
                    keyboardType="numeric"
                  />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Button
                    // button de salvar Informações do formulario hora improdutiva no banco
                    // e funçao de chamar hora automatico quando pressiona o button
                    title="Salvar "
                    color="green"
                    onPress={() => { 
                      onChangeInicial(moment().format('HH:mm:ss'))
                       Horaimpordutiva()
                      //resgisterimprodutivo()
                      //resgisterTeste()
                      setModalVisible2(!modalVisible2)

                    }}
                  />
                </View>

              </View>
            </View>
          </Modal>

        </View>



      </ScrollView>

    </View>

  );
}
// todos os objetos de estilização da tela do formularios
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',


  },
  title: {
    fontSize: 18,

    fontWeight: 'bold',
    padding: 18,
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    //marginBottom: 480,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  container4: {
    
    alignItems: 'center',
    //marginBottom: 480,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  picker: {
    flex: 1,
    //marginBottom: 480,
    backgroundColor: 'white',
  },

  input: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 2,
    color: 'black',
    width: 118,
  },
  input2: {
    height: 100,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 2,
    color: 'black',
    width: 377,
  },
  input3: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 2,
    color: 'black',
    width: 118,
    flexDirection: 'row',
    flexWrap: "wrap",
  },

  scrollView: {



  },
  fixToText: {
    flex: 1,
    marginTop: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

});
