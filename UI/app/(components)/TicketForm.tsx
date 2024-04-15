'use client'

import { Category, Priority, Status, Ticket, Workflow } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { SyntheticEvent, useState } from 'react';

const TicketForm = ({ticket, categories, priorities, statuses}) => {
    
    const EDITMODE = ticket.id === 'new' ? false : true;
    const router = useRouter();

    const handleChange = (e) => {
        
        const value = typeof e.target.valueAsNumber === 'number' && !isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            if(EDITMODE) {
                formData['updatedBy'] = 'User';
                const res = await fetch(`/api/Tickets/${ticket.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                
                if(!res.ok) {
                    const error = await res.json();
                    throw error;
                }
            } else {
                const res = await fetch('/api/Tickets',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                if(!res.ok) {
                    const error = await res.json();
                    throw error;
                }
            }
            router.refresh();
            router.push("/");
        } catch(error) {
            console.error('Error:',error);
            alert(error.message)
        }
    }

    let startingTicketData: Ticket = {
        title: "",
        description: "",
        priorityId: priorities.find((priority:Priority) => priority.level === 1).id,
        progress: 0,
        categoryId: categories[0].id,
        createdAt: new Date(),
        createdBy: 'System',
        updatedBy: 'System'
    };
    

    if(EDITMODE) {
        startingTicketData = ticket;
    }

    const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className='flex justify-center'>
        <form 
            className='flex flex-col gap-3 w-1/2'
            method="post"
            onSubmit={handleSubmit}>
            <h3>{EDITMODE ? "Update Your Ticket":"Create Your Ticket"}</h3>
            <label>Title</label>
            <input 
                id='title'
                name='title'
                type='text'
                onChange={handleChange}
                required={true} 
                value={formData.title}
            />
            <label>Description</label>
            <textarea 
                id='description'
                name='description'
                onChange={handleChange}
                required={true} 
                value={formData.description}
                rows={5}
            />
            <label>Category</label>
            <select
                id='categoryId'
                name='categoryId'
                value={formData.categoryId}
                onChange={handleChange}>
                    {categories?.map((category:Category) => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >
                            {category.description}
                        </option>))}
            </select>
            <label>Priority</label>
            <div>
                {priorities?.map((priority:Priority,_index:number) => (
                <>
                    <input
                        id={priority.id}
                        name='priorityId'
                        type='radio'
                        onChange={handleChange}
                        value={priority.id}
                        checked={formData.priorityId == priority.id} /><label key={_index}>
                            {priority.title}
                        </label>
                </>))}
                
            </div>
            <label>Progress</label>
            <input 
                type='range'
                id='progress'
                name='progress'
                value={formData.progress}
                min={0}
                max={100}
                onChange={handleChange}
                />
            {/*<label>Status</label>
            <select
                name='statusId'
                id='statusId'
                value={formData.statusId}
                onChange={handleChange}>
                {statuses?.map((status:Status) => (
                    <option 
                        key={status.id}
                        value={status.id}
                    >
                        {status.description}
                    </option>))}
                </select>*/}
            <input type='submit' className='btn' value={ EDITMODE ? "Update Ticket":"Create Ticket"} />
        </form>
    </div>
  )
}

export default TicketForm