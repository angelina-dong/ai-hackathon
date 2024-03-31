import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
//import * as FileSystem from 'expo-file-system';
import { documentDirectory } from 'expo-file-system';
import { FileSystem } from 'expo';
//import RNFS from 'react-native-fs';
//import csvContent from './merged_jobset_sample.csv';


const MainContainer = ({ navigation }) => {

    const otherSkills = ["Git", "Communication"];
    const [searchText, setSearchText] = useState('');
    //const [allSkills, setAllSkills] = useState([]);
    allSkills = ["JavaScript", "React", "Node.js", "HTML", "CSS", "Python", "Java", "C++", "SQL", "Git", "Agile", "Communication"];

    const [suggestions, setSuggestions] = useState(allSkills);
    const [currentPage, setCurrentPage] = useState(0);    
    const [selectedSkills, setSelectedSkills] = useState([]);
    const profession = "Full-Stack Software Engineer";


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const updateSuggestions = (text) => {
        const suggestedSkills = allSkills.filter(skill =>
            skill.toLowerCase().includes(text.toLowerCase())
        );
        setSuggestions(suggestedSkills);
    };

    const addSkill = (skill) => {
        setSelectedSkills([...selectedSkills, skill]);
        setSearchText('');
    };

    const removeSkill = (index) => {
        const updatedSkills = [...selectedSkills];
        updatedSkills.splice(index, 1);
        setSelectedSkills(updatedSkills);
    //     const updatedAllSkills = allSkills.filter(item => item !== skill);
    // setAllSkills(updatedAllSkills);
    };

    const backToSkillsInputPage = () => {
        setCurrentPage(currentPage - 2);
        setSuggestions(allSkills);
        setSearchText('');
        setSelectedSkills([])
    }

    useEffect(() => {
        //console.log(csvContent);
        const loadSkills = async () => {
            try {
                const csvFile = FileSystem.DocumentDirectoryPath + '../src/merged_jobset_sample.csv';
                console.log(csvFile);
                //const csvText = await RNterFS.readFile(csvFile, 'utf8');
                //console.log(fileUri);
                //const url = 'https://jsonplaceholder.typicode.com';

                //<Text style={{fontSize: 50, justifyContent: 'center'}}>{csvFile}, {fileUri}</Text>
                const response = await fetch(csvFile);
                console.log(response);

                if (!response.ok) {
                    throw new Error('Network request failed');
                }

                const data = await response.text();
                const rows = data.split('\n').slice(1);
                const skills = [];
                const uniqueSkills = rows.map(row => {
                    const columns = row.split(',');
                    return columns[2]; // Assuming you want the third column (index 2)
                });
                // rows.forEach(row => {
                //     const skill = row.split(',')[2]; 
                //     if (skill) {
                //         const skillsArray = skill.trim();
                //         skills.push(skillsArray);
                //     }
                // });
               // const uniqueSkills = [...new Set(skills)];
                setAllSkills(uniqueSkills);
                setSuggestions(uniqueSkills);
            } catch (error) {
                //console.error('Error reading CSV file:', error);
            }
        };
        loadSkills();
    }, []);

    const renderSuggestionItem = ({ item }) => (
        <TouchableOpacity style={styles.suggestionItem} onPress={() => { setSearchText(item); addSkill(item); renderSelectedSkills(); setSuggestions(allSkills)}}>
            <Text style={{ textAlign: 'center' }}>{item}</Text>
        </TouchableOpacity>
    );

    const renderSelectedSkills = () => (
        selectedSkills.map((skill, index) => (
            <TouchableOpacity key={index} onPress={() => removeSkill(index)}>
                <Text style={{padding: 2, fontSize: 15}}>{skill}</Text>
            </TouchableOpacity>
        ))
    );

    const renderPage = () => {
        switch (currentPage) {
            case 0:
                return (
                    <View style={styles.container}>
                        <Text style={styles.heading}>Skillink</Text>
                        <Text></Text>
                        <Text style={styles.label}>Enter your skills:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="enter skills here"
                            value={searchText}
                            onChangeText={(text) => {
                                setSearchText(text);
                                updateSuggestions(text);
                            }}
                        />
                       
                        <FlatList
                            style={styles.suggestionsList}
                            data={suggestions}
                            renderItem={renderSuggestionItem}
                            keyExtractor={(item) => item}
                        />
                        <Text style={styles.label}>Selected skills: </Text>
                         {renderSelectedSkills()}
                         <Text></Text>
                        <TouchableOpacity onPress={nextPage} style={styles.button}>
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 1:
                return (
                    <View style={{
                        flex: 1,
                        //justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#eaece5",
                        paddingTop: 100,
                        padding: 10,
                    }}>

                        <Text style={{ fontSize: 45, color: "#3b3a30", padding: 10, backgroundColor: "#b2c2bf", }}>Skillink</Text>
                        <Text style={{ padding: 10 }}></Text>
                        <Text style={{ padding: 20, fontSize: 30, flex: 1, textAlign: 'center', }}>We recommend you take on this profession: </Text>
                        <View style= {{flex: 2, width: 300}}>
                        <Text style={{flex: 2, fontSize: 50,  textAlign: 'center', color: "#b87289", backgroundColor: "#c0ded9", paddingTop: 20}}>{profession}</Text>
                        </View>
                        <Text style={{padding: 40}}></Text>
                        <TouchableOpacity onPress={nextPage} style={{
                            backgroundColor: '#f3be96',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20
                        }}>
                            <Text style={{
                                backgroundColor: '#f3be96',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                fontSize: 35
                            }}>{'->'}</Text>
                        </TouchableOpacity>
                        <Text style={{ padding: 30 }}></Text>
                    </View>
                );
            case 2:
                return (
                    <View style={{
                        flex: 1,
                        //justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#eaece5",
                        paddingTop: 60,
                        padding: 10, width: 400
                    }}>

                        <Text style={{ fontSize: 45, color: "#3b3a30", padding: 10, backgroundColor: "#b2c2bf", }}>Skillink</Text>
                        <Text style={{padding: 20}}></Text>
                        <View>
                        <View style={{flex: 1,  justifyContent: 'center'}}>
                            <Text style={{ padding: 10,fontSize: 20, flex: 2, textAlign: 'center'}}>Skills you already have for the {profession} role:</Text>
                            {selectedSkills.map((item, index) => (
                                <Text key={index} style={{textAlign: 'center', fontSize: 15, padding: 1}}>{item}</Text>
                            ))}
                        </View>
                        <Text style={{ padding: 15 }}></Text>
                        
                        <View style={{flex: 1, paddingTop: 10}}>
                        <Text style={{ padding: 10, fontSize: 20, flex: 1, textAlign: 'center', }}>Other skills needed to succeed for the {profession} role:</Text>
                        
                        {otherSkills.map((item, index) => (
                            <Text key={index} style={{textAlign: 'center',fontSize: 15, padding: 1}}>{item}</Text>
                        ))}
                        <Text style={{ padding: 35 }}></Text>

                        </View>
<View style={{paddingLeft: 20, paddingRight: 20}}>
                        <TouchableOpacity onPress={backToSkillsInputPage} style={{
                            backgroundColor: '#f3be96',
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            borderRadius: 20
                        }}>
                            <Text style={{
                                backgroundColor: '#f3be96',
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                borderRadius: 20,
                                fontSize: 22,
                                textAlign: 'center'
                            }}>{'Click here to search again!'}</Text>
                        </TouchableOpacity>
                        </View>
                        <Text style={{ padding: 100 }}></Text>
                        </View>
                    </View>
                )
            default:
                return null;
        }
    };

    return renderPage();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#eaece5",
        padding: 50,
        width: 400,
    },
    heading: {
        fontSize: 45,
        color: "#3b3a30",
        padding: 10,
        backgroundColor: "#b2c2bf",
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        color: '#246495',
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 10,
        padding: 8,
        fontSize: 20,
        width: '90%',
    },
    suggestionsList: {
        maxHeight: 150,
        marginBottom: 10,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    button: {
        backgroundColor: '#f3be96',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 20,
        color: "#246495",
        fontWeight: 'bold',
    },
});

export default MainContainer;
