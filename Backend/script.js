const DATABASE_URL = "postgres://kgstbsghuussjy:8b6ae05fd3034672ed99f14b4c5718fc20d88aafefa0fb67c73bd7ffbd3433c8@ec2-35-169-11-108.compute-1.amazonaws.com:5432/d931ac99g53jf2";

const Client = require("pg").Client

const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

async function create() {
    await client.query(
        `CREATE TABLE Users (
            UserID SERIAL PRIMARY KEY,
            FirstName VARCHAR(50),
            LastName VARCHAR(50),
            Email VARCHAR(100),
            Password VARCHAR(100),
            Role TEXT
        );`
    );

    await client.query(
        `CREATE TABLE Vacations (
            VacationID SERIAL PRIMARY KEY,
            Destination VARCHAR(100),
            Description TEXT,
            StartDate DATE,
            EndDate DATE,
            Price DECIMAL(10, 2),
            ImageFileName VARCHAR(255)
        );`
    )

    await client.query(
        `CREATE TABLE Followers (
            FollowerUserID INT,
            FollowedVacationID INT,
            FOREIGN KEY (FollowerUserID) REFERENCES Users(UserID),
            FOREIGN KEY (FollowedVacationID) REFERENCES Vacations(VacationID),
            PRIMARY KEY (FollowerUserID, FollowedVacationID)
        );`
    )
};

// create();

async function insertVacation() {
    await client.query(
        `INSERT INTO Vacations (Destination, Description, StartDate, EndDate, Price, ImageFileName)
        VALUES
            ('Hawaii', 'Experience the beautiful beaches and tropical landscapes.', '2023-09-15', '2023-09-25', 1500.00, 'https://media.istockphoto.com/id/938335974/photo/aerial-view-of-kualoa-area-of-oahu-hawaii.jpg?s=612x612&w=0&k=20&c=OqqkjtRGFffwCx5Ac4kyfO9AReN-wnc6hGW8jJp7vok='),
            ('Paris', 'Explore the romantic streets and iconic landmarks of Paris.', '2023-10-10', '2023-10-20', 1200.00, 'https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.jpg?s=612x612&w=0&k=20&c=sFn6FwTJR0TpX3rP_W4VHrbkTB__6l5kr-lkkqdYrtE='),
            ('Bali', 'Relax and rejuvenate in the serene atmosphere of Bali.', '2023-11-05', '2023-11-15', 1800.00, 'https://media.istockphoto.com/id/675172642/photo/pura-ulun-danu-bratan-temple-in-bali.jpg?s=612x612&w=0&k=20&c=_MPdmDviIyhldqhf7t6s63C-bZbTGfNHMlJP9SIa8Y0='),
            ('New York', 'Discover the bustling energy of the city that never sleeps.', '2023-09-25', '2023-10-05', 1300.00, 'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty.jpg'),
            ('Tokyo', 'Immerse yourself in the vibrant culture and technology of Tokyo.', '2023-10-30', '2023-11-10', 1600.00, 'https://media.istockphoto.com/id/1131743616/photo/aerial-view-of-tokyo-cityscape-with-fuji-mountain-in-japan.jpg?s=612x612&w=0&k=20&c=0QcSwnyzP__YpBewnQ6_-OZkn0XDtq-mXyvLSSakjZE='),
            ('Rome', 'Explore the ancient history and architecture of Rome.', '2023-11-15', '2023-11-25', 1400.00, 'https://www.edreams.com/blog/wp-content/uploads/sites/3/2018/07/view-rome.jpg'),
            ('Maldives', 'Experience luxury and relaxation on stunning island resorts.', '2023-12-01', '2023-12-10', 2000.00, 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-1483053.jpg&fm=jpg'),
            ('Sydney', 'Enjoy the beauty of Sydneys harbor and diverse culture.', '2023-12-20', '2023-12-30', 1700.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuCpwVXupRQGJN0MO8ha2Ggi0pmXUISeeZIg&usqp=CAU'),
            ('Cancun', 'Party and unwind on the beaches of Cancun.', '2023-09-10', '2023-09-20', 1400.00, 'https://st.depositphotos.com/2944235/54459/i/450/depositphotos_544592770-stock-photo-view-of-beautiful-hotels-in.jpg'),
            ('London', 'Experience the mix of history and modernity in London.', '2023-10-15', '2023-10-25', 1500.00, 'https://images.unsplash.com/photo-1520986606214-8b456906c813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvbmRvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'),
            ('Santorini', 'Witness breathtaking sunsets and stunning views in Santorini.', '2023-11-20', '2023-11-30', 1700.00, 'https://media.istockphoto.com/id/1145450965/photo/santorini-island-greece.jpg?s=612x612&w=0&k=20&c=AY_kxRrkTjbDLhqpotxgW8CZp4ovEIM1tRdTrvXKcAM='),
            ('Rio de Janeiro', 'Celebrate life and culture in the vibrant city of Rio.', '2023-12-10', '2023-12-20', 1600.00, 'https://media.istockphoto.com/id/608540602/photo/aerial-panorama-of-botafogo-bay-rio-de-janeiro.jpg?s=170667a&w=0&k=20&c=i7tD6i6BV2aNoGJrBzgceRVpHWSYR9o_2gR93CXZnoQ=');
        `
    )
};

// insertVacation() 