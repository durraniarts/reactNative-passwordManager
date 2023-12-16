import {Button, StyleSheet, Text, View, Switch, ScrollView} from 'react-native';
import React, {useState} from 'react';
// import { radioButton } from 'react-native-paper'
import {TextInput} from 'react-native-paper';

// FORM VALIDATION
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'should be at least 4 characters')
    .max(16, 'should be max of 16 characters')
    .required('This field is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [IsPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    const charLength = characters.length - 1;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * charLength);
      result += characters[characterIndex];
    }
    return result;
  };

  const generatePasswordString = async (passwordLength: number) => {
    let characterList = '';
    if (lowerCase) characterList += 'abcdefghijklmnopqrstuvwxyz';
    if (upperCase) characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) characterList += '0123456789';
    if (symbols) characterList += '?@#$%^&';

    const generatedPassword = createPassword(characterList, passwordLength);
    setPassword(generatedPassword);
    setIsPassGenerated(true);
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{margin: 50, display: 'flex', gap: 15}}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#392467'}}>
          Password Generator
        </Text>

        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            generatePasswordString(Number(values.passwordLength));
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
            /* and other goodies */
          }) => (
            <>
              <View>
                {/* <Text style={{fontWeight: '600', fontSize: 16, color: 'black'}}>
                  Password Length
                </Text> */}
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={{color: 'red'}}>{errors.passwordLength}</Text>
                )}
                <TextInput
                  label="Password Length"
                  autoFocus
                  style={{
                    backgroundColor: '#EAECCC',
                    borderRadius: 7,
                  }}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                  mode="outlined"
                />
              </View>
              {/* Input check boxes */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 7,
                }}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Include Lowercase
                </Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={lowerCase}
                  onPress={() => {
                    setLowerCase(!lowerCase);
                  }}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 7,
                }}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Include Uppercase Letters
                </Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={upperCase}
                  onPress={() => {
                    setUpperCase(!upperCase);
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 7,
                }}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Include Numbers
                </Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={numbers}
                  onPress={() => {
                    setNumbers(!numbers);
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 7,
                }}>
                <Text style={{fontWeight: '600', color: 'black'}}>
                  Include Symbols
                </Text>
                <BouncyCheckbox
                  disableBuiltInState
                  isChecked={symbols}
                  onPress={() => {
                    setSymbols(!symbols);
                  }}
                />
              </View>
              {/* Buttons */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Button
                  disabled={!isValid}
                  title="Generate Password"
                  onPress={() => {
                    handleSubmit();
                    isValid && !errors && setIsPassGenerated(!IsPassGenerated);
                  }}
                />
                <Button
                  title="Reset"
                  onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}
                />
              </View>
            </>
          )}
        </Formik>
        {IsPassGenerated ? (
          <View
            style={{
              backgroundColor: '#A367B1',
              padding: 20,
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={{color: '#FFD1E3'}}>Long Press To Copy</Text>
            <Text
              selectable={true}
              style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              {password}
            </Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#A367B1',
              padding: 20,
              borderRadius: 5,
              flex: 1,
              alignItems: 'center',
              gap: 10,
            }}></View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
