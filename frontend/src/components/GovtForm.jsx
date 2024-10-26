// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import amblem from '@/assets/amblem.png'
// import Image from 'next/image';
// const GovtSchemeAdvisor = () => {
//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
//       {/* Government Logo Card */}
//       <Card className="bg-white">
//         <CardContent className="flex justify-center p-6">
//           <Image 
//             src={amblem}
//             alt="Government of India Emblem"
//             className="h-20"
//           />
//         </CardContent>
//       </Card>

//       {/* Main Form Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">
//             Government Scheme Advisor
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Location */}
//             <div className="space-y-2">
//               <label className="text-sm">Location</label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="delhi">Rural</SelectItem>
//                   <SelectItem value="mumbai">Urban</SelectItem>
//                   <SelectItem value="bangalore">Semi-Urban</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Occupation */}
//             <div className="space-y-2">
//               <label className="text-sm">Occupation</label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="farmer">Farmer</SelectItem>
//                   <SelectItem value="student">Student</SelectItem>
//                   <SelectItem value="business">Business</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Category */}
//             <div className="space-y-2">
//               <label className="text-sm">Category</label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="general">General</SelectItem>
//                   <SelectItem value="obc">OBC</SelectItem>
//                   <SelectItem value="sc">SC</SelectItem>
//                   <SelectItem value="st">ST</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Annual Income */}
//             <div className="space-y-2">
//               <label className="text-sm">Annual Income</label>
//               <Input type="text" placeholder="Enter your Income" />
//             </div>

//             {/* Gender */}
//             <div className="space-y-2">
//               <label className="text-sm">Gender</label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="male">Male</SelectItem>
//                   <SelectItem value="female">Female</SelectItem>
//                   <SelectItem value="other">Other</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Age */}
//             <div className="space-y-2">
//               <label className="text-sm">Age</label>
//               <Input type="number" placeholder="Enter your Age" />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4">
//             <Button variant="outline" className="w-24">
//               Cancel
//             </Button>
//             <Button className="w-24">
//               Continue
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results Card */}
//       <Card>
//         <CardContent className="p-6 space-y-4">
//           <h3 className="text-lg font-semibold">Schemes Suitable for you :</h3>
//           <div className="space-y-2">
//             <div className="text-sm text-blue-600">Match Confidence :</div>
//             <Progress value={33} className="h-2" />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default GovtSchemeAdvisor;






"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import amblem from '@/assets/amblem.png';
import Image from 'next/image';

const GovtSchemeAdvisor = () => {
  // Form state
  const [formData, setFormData] = useState({
    location: '',
    occupation: '',
    category: '',
    income: '',
    gender: '',
    age: ''
  });

  // Results state
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (Object.values(formData).some(value => !value)) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/match-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch matching schemes');
      }

      const data = await response.json();
      setResults(data.matches);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPercentage = (decimal) => {
    return `${(decimal).toFixed(1)}%`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Government Logo Card */}
      <Card className="bg-white">
        <CardContent className="flex justify-center p-6">
          <Image 
            src={amblem}
            alt="Government of India Emblem"
            className="h-20"
            width={80}
            height={80}
          />
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Government Scheme Advisor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm">Location</label>
              <Select onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rural">Rural</SelectItem>
                  <SelectItem value="urban">Urban</SelectItem>
                  <SelectItem value="semi-urban">Semi-Urban</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <label className="text-sm">Occupation</label>
              <Select onValueChange={(value) => handleInputChange('occupation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm">Category</label>
              <Select onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Annual Income */}
            <div className="space-y-2">
              <label className="text-sm">Annual Income</label>
              <Input 
                type="number"
                placeholder="Enter your Income"
                onChange={(e) => handleInputChange('income', e.target.value)}
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm">Gender</label>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm">Age</label>
              <Input 
                type="number"
                placeholder="Enter your Age"
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="w-24"
              onClick={() => setFormData({
                location: '',
                occupation: '',
                category: '',
                income: '',
                gender: '',
                age: ''
              })}
            >
              Reset
            </Button>
            <Button 
              className="w-24"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      {(results || loading) && (
        <Card>
          <CardHeader>
            <CardTitle>Schemes Suitable for you</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {loading ? (
              <Progress value={33} className="h-2" />
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {results?.map((scheme, index) => (
                  <AccordionItem key={scheme.scheme_code} value={`scheme-${index}`} className="border rounded-lg p-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col items-start text-left w-full">
                        <h4 className="font-semibold text-lg">{scheme.scheme_name}</h4>
                        <p className="text-sm text-gray-600">{scheme.ministry}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 mt-4">
                      {/* Scores Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Overall Match</div>
                          <Progress value={scheme.match_score * 100} className="h-2" />
                          <div className="text-sm text-gray-600">{formatPercentage(scheme.match_score)}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Keyword Match</div>
                          <Progress value={scheme.keyword_score * 100} className="h-2" />
                          <div className="text-sm text-gray-600">{formatPercentage(scheme.keyword_score)}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Semantic Match</div>
                          <Progress value={scheme.semantic_score * 100} className="h-2" />
                          <div className="text-sm text-gray-600">{formatPercentage(scheme.semantic_score)}</div>
                        </div>
                      </div>

                      {/* Scheme Details */}
                      <div className="space-y-4">
                        {scheme.objective && (
                          <div>
                            <h5 className="font-medium mb-2">Objective</h5>
                            <p className="text-gray-700">{scheme.objective}</p>
                          </div>
                        )}
                        
                        {scheme.beneficiary && (
                          <div>
                            <h5 className="font-medium mb-2">Beneficiaries</h5>
                            <p className="text-gray-700">{scheme.beneficiary}</p>
                          </div>
                        )}

                        {scheme.features && (
                          <div>
                            <h5 className="font-medium mb-2">Features</h5>
                            <p className="text-gray-700">{scheme.features}</p>
                          </div>
                        )}

                        {scheme.relevance_reasons && scheme.relevance_reasons.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2">Why this scheme matches your profile</h5>
                            <div className="flex flex-wrap gap-2">
                              {scheme.relevance_reasons.map((reason, idx) => (
                                <Badge key={idx} variant="secondary">{reason}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GovtSchemeAdvisor;