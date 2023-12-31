import axios from "axios";
import React from "react";
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getCookieByName } from "../utils/cookie";

function AdminBlog() {
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [blog, setBlog] = useState([]);
      
    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.get(`http://localhost:4000/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${getCookieByName('access_token')}`,
                },
                });
                setBlog(response.data.blog);
                setComments(response.data.comments)
                //console.log(response.data.comments)
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };
      
        
        fetchData();
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="card mt-4" style={{ width: '55rem' }}>
                <div className="card-body">
                    <h3 className="card-title">{blog.title}</h3>
                    <div style={{ color: '#87CEEB' }}>{blog?.user_id?.user_name}</div>
                    <div className="mb-2">{moment(blog.public_date).format('HH:mm DD-MM-YYYY')}</div>
                    <div >
                        {blog?.image?.url && 
                            <img 
                                src={blog.image.url}
                                alt=""
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        }
                    </div>
                    {/* <div className="">{blog.content}</div> */}
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="mt-3"/>
                </div>
            </div>
            <div className="card mt-4 mb-4" style={{ width: '55rem' }}>
                <div className="card-body">
                    <h4 className="card-title">Bình Luận</h4>
                    <div className="mt-3">
                        {comments.map((comment, index) => (
                            <div key={index} className="mb-2">
                                <strong>{comment.user_id.user_name} :</strong> {comment.comment}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminBlog;
