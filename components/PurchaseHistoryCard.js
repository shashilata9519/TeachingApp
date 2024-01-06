import React from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment, { Moment } from "moment/moment";
import InfoView from "./TeacherInfoView";
import { ScrollView } from "react-native-gesture-handler";
import tw from "twrnc";
import { green } from "@mui/material/colors";


export default function TestingCard(props) {
    
    return <View style={{ padding: 16, backgroundColor: '#FFF', borderRadius: 12, margin: 16, marginTop: 8, marginBottom: 8, width: 350, }}>
        {/* Title */}
        <Text style={{ fontSize: 17, fontWeight: 'bold',textAlign:'center' }}>Card 5 (Purchase History Card )</Text>
        {/* Request card 1 */}
        <View style={{paddingBottom: 10, paddingTop:40}}>
        <TouchableOpacity  style={{ paddingRight: 10, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0}}>
        <View style={{ flexDirection: 'column', marginBottom: 4, marginLeft:5 }}>
        
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Applied at: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Aug 9th 2023</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Course: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Gandharva Madhyama Pratham</Text></Text>
            {/* <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Genre: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Hindustani-Classical-Vocals</Text></Text> */}
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Teacher: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Jane Do</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Status: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Captured</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Tnx. ID: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>pay_MTbIYGqtC1pMbNqweqwe</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal', paddingBottom:15}}>Payment Amount: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>INR 1.1</Text>
            <Text style={{fontSize: 15,fontWeight: 'normal', color:"#000" }} numberOfLines={2}> Invoice</Text>
            </Text>
            {/* <View style={{alignItems:'center' ,flexDirection:'row',paddingBottom: 5,paddingLeft:70}}>
            <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300 w-20 mr-2 `}>
                     <Text style={{fontWeight:"bold", textAlign:"center"}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 w-20`}>
                     <Text style={{fontWeight:"bold", textAlign:"center"}}>Delete</Text>
            </TouchableOpacity>
            </View> */}
        </View>
        </TouchableOpacity>
        </View>

        {/* Request card 1 */}
        {/* <View style={{paddingBottom: 10, paddingTop:10}}>
        <TouchableOpacity  style={{ paddingRight: 10, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0}}>
        <View style={{ flexDirection: 'column', marginBottom: 4, marginLeft:5 }}>
        
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Applied at: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Aug 9th 2023</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Course: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Gandharva Madhyama Pratham</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Genre: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Hindustani-Classical-Vocals</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Teacher: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Jane Do</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Fee: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>500-1000</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Time: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Evening</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal', paddingBottom:15}}>Day: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Sun,Mon,Tue,Wed,Thur,Fri,Sat</Text></Text>
            <View style={{alignItems:'center' ,flexDirection:'row',paddingBottom: 5,paddingLeft:70}}>
            <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300 w-20 mr-2 `}>
                     <Text style={{fontWeight:"bold", textAlign:"center"}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 w-20`}>
                     <Text style={{fontWeight:"bold", textAlign:"center"}}>Delete</Text>
            </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
        </View> */}
        
        {/* Request card 1 */}
        {/* <View style={{paddingBottom: 10, paddingTop:10}}>
        <TouchableOpacity  style={{ paddingRight: 10, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0}}>
        <View style={{ flexDirection: 'column', marginBottom: 4, marginLeft:5 }}>
        
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Applied at: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Aug 9th 2023</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Course: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Gandharva Madhyama Pratham</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Genre: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Hindustani-Classical-Vocals</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Teacher: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Jane Do</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Fee: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>500-1000</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal' }}>Time: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Evening</Text></Text>
            <Text style={{ fontSize: 15, fontWeight: 'normal', paddingBottom:15}}>Day: <Text style={{fontSize: 15,fontWeight: 'bold' }} numberOfLines={2}>Sun,Mon,Tue,Wed,Thur,Fri,Sat</Text></Text>
            <View style={{alignItems:'center' ,flexDirection:'row',paddingBottom: 5,paddingLeft:70}}>
            <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300 w-20 mr-2 `}>
                     <Text style={{fontWeight:"bold", textAlign:"center"}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 w-20`}>
                     <Text style={{fontWeight:"bold", textAlign:"center"}}>Delete</Text>
            </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
        </View> */}
        
        
        {/* class Info  */}
        {/* <View>
        <ScrollView showsHorizontalScrollIndicator={true} horizontal={true}  style={{ borderRadius: 12, marginTop: 8, paddingLeft: 0, paddingRight: 16, marginBottom: 8,}}>
        <TouchableOpacity  style={{ paddingRight: 10, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0}}>
                    <View style={{ paddingRight: 8, padding: 8, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 1</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 2</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 3</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }}>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8 ,marginBottom: 5 }}>Class 4</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5 }}>Aug 9th 2023</Text>
                    <Text style={{ fontSize: 14, paddingHorizontal: 8,marginBottom: 5 }}>5:05 PM</Text>
                    <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#228b22',fontWeight:'bold',borderRadius:10 }}>Completed</Text>
                
                  </View>
                  
                  
                  </View>
                 
                
                </TouchableOpacity>
              </ScrollView> */}
              {/* Student Info */}
              {/* <ScrollView showsHorizontalScrollIndicator={true} horizontal={true}  style={{ borderRadius: 12, marginTop: 8, paddingLeft: 0, paddingRight: 16, marginBottom: 8,}}>
                <TouchableOpacity style={{ paddingRight: 8, justifyContent: "center", backgroundColor: '#a9a9a9',  borderRadius: 10, marginLeft:0, flexDirection: 'row'}}>
                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 1</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 2</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                    <View style={{ paddingRight: 8, padding: 0, justifyContent: "center", flexDirection: 'row', flex : 1, margin: 1,}}>
                        <View style={{ padding: 4, backgroundColor: '#FFF', borderRadius: 12, margin: 5, marginTop: 10, marginBottom: 10, alignItems: "center", }} >
                                                <View style={{ flexDirection: 'column', marginTop: 0, marginBottom: 4 , }}>
                                                    <View style={{ flexDirection: 'row',margin: 5}}>
                                                        <Text style={{textAlign:'left', fontWeight:'bold', textDecorationColor: '#006400'}}>paid</Text>
                                                        <View style={{ marginLeft: 28, backgroundColor: 'gray', borderRadius: 8, padding: 8, paddingBottom: 4, paddingTop: 4, textAlign: 'right', }}>
                                                            <Text style={{ textAlign: 'center', fontSize: 11, color: '#FFFFFF' }}>Demo</Text>
                                                        </View>

                                                    </View>
                                                    <View style={{ alignItems: "center",}}>
                                                     <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
                                                        <View style={{alignItems:"center"}}>
                                                        <Text style={{ fontSize: 14 , paddingHorizontal: 8,marginBottom: 5, backgroundColor: '#fff',fontWeight:'bold',borderRadius:10 }}>Student 3</Text>
                                                        <View style={{flexDirection: 'row'}}>
                                                        <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                                                            <Text style={{fontWeight:"bold"}}>X</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={tw` text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl ml-2`}>
                                                            <Text style={{fontWeight:"bold"}}>Chat</Text>
                                                        </TouchableOpacity>
                                                        </View>
                                                        </View>
                                                    </View>
                                                </View>
                        </View>

                    </View>

                </TouchableOpacity>
              </ScrollView> */}

              {/* Action buttons */}
              {/* <View style={{alignItems:"center", paddingTop: 20 , paddingBottom: 0}}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Action</Text>
                    <View style={{flexDirection:"row" ,paddingTop: 8}}>
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-sky-600 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>[]</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-red-500 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-green-700 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>\/</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={tw`border-red-10 border rounded-full p-2 bg-blue-300 text-white mr-2`}>
                        <Text style={{fontWeight:"bold"}}>Join Class</Text>
                    </TouchableOpacity>           
                    </View>                    
              </View>



        </View> */}



        {/* Info */}
        {/* <View style={{ flexDirection: 'row', marginTop: 4, marginBottom: 4 ,width: 290, }}>
            <Image style={{  width: 48, height: 48, borderRadius: 24, borderColor: '#E8EAED', borderWidth: 1, marginRight: 8 }} source={{uri: "https://xcool.s3.ap-south-1.amazonaws.com/images/RnwChyBMxG2yalhC0DuzTToOvL0zrb5kf666ezs5.png"}} />
            <View>
                <Text style={{ fontSize: 14 }}>by Jane Doe</Text>
                <Text style={{ fontSize: 14 }}>Guitar</Text>
                <Text style={{ fontSize: 14 }}>3 Classes</Text>
            </View>
        </View>  */}
        {/* Dates */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 4 }}>
            <View>
                <Text style={{ fontSize: 14 }}>Start Date</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment().format("ddd DD MMM, YYYY")}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 14 }}>End Date</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{moment().format("ddd DD MMM, YYYY")}</Text>
            </View>
        </View> */}
        {/* Fees & Application */}
        {/* <View style={{ marginTop: 4, marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Fees:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>₹ 500</Text>
            </View> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14 }}>Application Status:</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#e87e39' }}>Applied</Text>
            </View>
        </View> */}
        {/* Schedule */}
        
        {/* Students */}
        
        {/* Actions */}
        {/* <View style={{ height: 44, flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
           
            <View></View>
            <View style={{ backgroundColor: '#3E8493', borderRadius: 12, width: '100%' }}>
                <Pressable >
                    <Text style={{ textAlign: 'center', fontSize: 14, color: '#FFFFFF', padding: 12, fontWeight: 'bold' }}>Join Class 2</Text>
                </Pressable>
            </View>
        </View> */}


       
    </View>
}